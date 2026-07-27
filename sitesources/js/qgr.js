let url0 = new URL(window.location.href);
let code = url0.searchParams.get("qgvc");
function setTurnstile() {
    if (!code) return;
    if (turnstile) {
        xsdToast.info("阅读群公告后在页面底部完成验证。");
        const btn = document.getElementById("verifyButton");
        btn.style.display = "block";
        btn.addEventListener("click", function () {
            this.classList.remove("click-anim");
            void this.offsetWidth;
            this.classList.add("click-anim");
            const self = this;
            setTimeout(() => {
                self.remove()

                const resultH3 = document.querySelector('#result h3');
                resultH3.textContent = "请稍等...";
                resultH3.style.color = "black";
            }, 250);

            setTimeout(() => {
                turnstile.execute("#turnstile-widget");
            }, 2000);
        });
        turnstile.render(document.getElementById("turnstile-widget"), {
            size: window.innerWidth < 400 ? 'compact' : 'flexible',
            sitekey: '0x4AAAAAABghjek4jVecQ-sc',
            'callback': handleSuccess,
            'error-callback': handleFailed,
            'expired-callback': handleFailed,
            'timeout-callback': handleFailed,
            execution: "execute",
            theme: "light"
        })
    } else {
        setTimeout(setTurnstile, 1000);
    }
}
window.headerLoadedCallback = setTurnstile;

let alreadyFlag = false;

function handleSuccess(response) {
    console.log("awa!")
    turnstile.remove()
    if (alreadyFlag) return;
    const resultH3 = document.querySelector('#result h3');
    const thisUrl = new URL(window.location.href)
    if (!thisUrl.searchParams.get("qgvc")) {
        handleResult(function () {
            setTimeout(() => window.location.replace("/"), 5000)

            resultH3.textContent = "Hmmm, 好像缺少了什么东西验证不了呢qwq";
            resultH3.style.color = "red";
        })
        return;
    }

    let hookurl
    if (thisUrl.searchParams.get("hook")) {
        let hook = thisUrl.searchParams.get("hook")
        try {
            hookurl = new URL(hook)
        } catch (error) {
            handleResult(function () {
                resultH3.textContent = "Hook参数无效!";
                resultH3.style.color = "red";
            })
            return;
        }
    }

    resultH3.textContent = "稍等一下, 马上就好...";
    resultH3.style.color = "black";

    const requestVerify = new XMLHttpRequest()

    requestVerify.open("post", "https://" + window.location.hostname + "/qqgroupmemberverify?action=handle&code=" + thisUrl.searchParams.get("qgvc") + "&response=" + response + (hookurl ? "&hook=" + encodeURIComponent(hookurl.toString()) : ""))

    requestVerify.onload = requestSuccess

    requestVerify.ontimeout = requestVerify.onerror = requestVerify.onabort = requestFailed

    requestVerify.send()

    function requestSuccess() {
        handleResult(function () {
            let json
            try {
                json = JSON.parse(requestVerify.responseText)
            } catch (error) {
                if (requestVerify.status != 200) {
                    executeRefresh("验证返回了错误码: " + requestVerify.status, true)
                    return;
                }
                console.log(error)
                executeRefresh("验证返回了错误的JSON数据 :(", true)
                return;
            }

            if (json.success) {
                if (false) {

                    const requestHook = new XMLHttpRequest()
                    requestHook.open("get", "https://hook." + window.location.hostname + "/qqgmv?code=" + json.code + "&verifycode=" + json.verifycode + "&groupnumber=" + json.groupnumber + "&qqnumber=" + json.qqnumber + "&ip=" + json.ip)

                    requestHook.onload = function () {
                        if (requestHook.responseText == "成功啦") {
                            resultH3.textContent = "验证成功啦awa, 你可以关闭这个页面了!";
                            resultH3.style.color = "green";
                        } else {
                            requestHookFailed();
                        }
                    }
                    function requestHookFailed() {
                        setTimeout(() => window.location.reload(), 5000)
                        resultH3.textContent = "验证成功了qwq, 但是请求网络钩子失败了, 等待5s后重试吧";
                        resultH3.style.color = "red";
                    }
                    requestHook.ontimeout = requestHook.onerror = requestHook.onabort = requestHookFailed

                    requestHook.send()
                }
                executeVerifySuccess()
            } else if (requestVerify.status == 404) {
                executeRefresh("验证链接不存在或已过期!", false)
            } else {
                executeRefresh(json.msg, true)
            }

        })
    }
    function requestFailed() {
        handleResult(executeRefresh, "请求验证网址失败了qwq", true)
    }

}

let tries = 0;

function handleFailed(info) {
    tries++;
    console.log("验证失败: " + info + ", 第" + tries + "次重试。")
    turnstile.reset()
    turnstile.execute("#turnstile-widget");
}

function handleResult(fun, reason, shouldReload) {
    if (!alreadyFlag) {
        alreadyFlag = true;
        fun(reason, shouldReload)
    }
}

function executeRefresh(reason, shouldReload) {
    console.log("qwq...")
    if (shouldReload) setTimeout(() => window.location.reload(), 5000)

    const resultH3 = document.querySelector('#result h3');
    resultH3.innerHTML = "验证失败qwq: " + reason;
    xsdToast.error("验证失败: " + reason);
    resultH3.style.color = "red";
}

function executeVerifySuccess() {
    const resultH3 = document.querySelector('#result h3');
    resultH3.innerHTML = "验证成功啦awa, 你可以关闭这个页面了!";
    xsdToast.success("验证已完成");
    resultH3.style.color = "green";
}