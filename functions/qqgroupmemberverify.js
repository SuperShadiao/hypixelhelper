export async function onRequest(context) {
    const url = new URL(context.request.url);

    let code = url.searchParams.get("code")
    let verifycode = generateRandomString1(5)
    const action = url.searchParams.get("action")
    const groupnumber = url.searchParams.get("groupnumber")
    const qqnumber = url.searchParams.get("qqnumber")
    const longtime = url.searchParams.get("longtime")
    const response = url.searchParams.get("response")
    const hook = url.searchParams.get("hook")

    if (action == "new") {

        code = generateRandomString1(7)
        verifycode = generateRandomString1(5)

        if (!groupnumber || !qqnumber || !longtime) {
            return new Response("参数缺失", { status: 400 })
        }

        const json = {
            verifycode: verifycode,
            groupnumber: groupnumber,
            qqnumber: qqnumber
        }

        await context.env.gv.put(code, JSON.stringify(json), {
            expirationTtl: (longtime == "true" ? 60 * 60 * 24 * 10 : 60 * 10)
        })

        json.msg = "成功啦"
        json.code = code;

        const init = createJsonContentType();
        return new Response(JSON.stringify(json), init)
    } else if (action == "handle") {

        const data = await context.env.gv.get(code)

        let obj = { success: false, msg: "未知错误" }

        if (context.request.method !== "POST") {
            // return new Response("请使用POST请求!", { status: 405 })
            obj.msg = "请使用POST请求!"
            const response = Response.json(obj, { status: 405 })
            return response
        }

        const result = await doVerify(context, response)
        if (!result.success) {
            obj.msg = "验证失败"
            const response = Response.json(obj, { status: 401 })
            return response
        }

        if (!code || !response) {
            // return new Response("参数缺失", { status: 400 })
            obj.msg = "参数缺失"
            const response = Response.json(obj, { status: 400 })
            return response
        }

        if (!data) {
            obj.msg = "验证代码" + code + "不存在"
            const response = Response.json(obj, { status: 404 })
            return response
        }

        obj = Object.assign(JSON.parse(data), obj)
        obj.code = code
        obj.ip = result.ip

        const json = obj

        if (hook) {

            let hookurl
            try {
                hookurl = new URL(hook)
                hookurl.searchParams.set("code", code)
                hookurl.searchParams.set("verifycode", verifycode)
                hookurl.searchParams.set("groupnumber", groupnumber)
                hookurl.searchParams.set("qqnumber", qqnumber)
                hookurl.searchParams.set("ip", result.ip)
            } catch (error) {
                obj.msg = `Hook ${hook} 无效!`
                const response = Response.json(obj, { status: 400 })
                return response
            }
            const hookresponse = await (await fetch(hookurl)).text()
            obj.success = true
            obj.msg = "已尝试请求Hook! 请求是否正确请检查后台"
        }

        if (await (await fetch("https://hook.xiaoshadiao.club/qqgmv?code=" + json.code + "&verifycode=" + json.verifycode + "&groupnumber=" + json.groupnumber + "&qqnumber=" + json.qqnumber + "&ip=" + json.ip)).text() != "成功啦") {
            obj.msg = "验证成功了, 但是请求网络钩子失败了qwq, 等待5s后重试吧"
            const response = Response.json(obj, { status: 500 })
            return response
        }
        obj.success = true
        obj.msg = "成功啦"

        // await context.env.gv.delete(code)

        return Response.json(obj)
    } else if (!action) {
        return context.next();
    }


    return new Response("参数错误", { status: 400 })
}

function createJsonContentType() {
    return { headers: { "Content-Type": "application/json" } }
}

function generateRandomString(length, chars) {
    let result = '';
    const charactersLength = chars.length;
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function generateRandomString1(length) {
    return generateRandomString(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
}

async function doVerify(context, response) {

    const ip = context.request.headers.get('CF-Connecting-IP');

    let formData = new FormData();
    formData.append("secret", context.env.turnstile_qqgmv);
    formData.append("response", response);
    formData.append('remoteip', ip);

    const url2 = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const result = await fetch(url2, {
        body: formData,
        method: "POST",
    });

    const jsonData = await (result.json())

    return { success: jsonData.success, ip: ip }
}
