export async function onRequest(context) {
    const url = new URL(context.request.url);

    const code = generateRandomString1(7)
    const verifycode = generateRandomString1(5)
    const action = url.searchParams.get("action")
    const groupnumber = url.searchParams.get("groupnumber")
    const qqnumber = url.searchParams.get("qqnumber")
    const longtime = url.searchParams.get("longtime")
    const response = url.searchParams.get("response")

    if (action == "new") {

        if (!groupnumber || !qqnumber || !longtime) {
            return new Response("参数缺失", { status: 400 })
        }

        const json = {
            verifycode: verifycode,
            groupnumber: groupnumber,
            qqnumber: qqnumber
        }

        await context.env.gv.put(code, JSON.stringify(json), {
            expiration: (longtime == "true" ? 60 * 60 * 24 * 10 : 60 * 10)
        })

        json.msg = "成功啦"
        json.code = code;

        const init = createJsonContentType();
        return new Response(JSON.stringify(json), init)
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
