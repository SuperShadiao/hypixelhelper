const goto = {
    "1": "https://github.com/ABCOA/Legacy-SoarClient",
    "2": "https://modrinth.com/mod/yqlossclientmixin",
    "3": "https://space.bilibili.com/524241250",
    "4": "https://maoyyds.cn",
    "5": "https://space.bilibili.com/1917949964",
    "6": "https://space.bilibili.com/3494361276877525",
    "7": "https://wt.4d4v.fun/about.html",
    "8": "https://space.bilibili.com/526689535",

    "as": "/antiscamming",
    "as_s2": "https://github.com/SuperShadiao/hypixelhelper/wiki/Discord%E9%98%B2%E9%AA%97%E8%AD%A6%E7%A4%BA#%E5%9C%BA%E6%99%AF2-skill-issue%E6%9D%A5%E7%9A%84%E5%B9%B6%E9%82%80%E8%AF%B7%E6%88%91%E5%8A%A0%E5%85%A5%E5%B7%B2%E7%BB%8F%E5%8A%A0%E8%BF%87%E7%9A%84%E6%9C%8D%E5%8A%A1%E5%99%A8",

    "100": "https://act.mihoyo.com/sr/event/e20251105return-tb31ya/index.html?utm_source=share&utm_medium=qr&utm_campaign=ingame&inviter=CAM8N2SKXN&mhy_landscape=true&mhy_auth_required=true&mhy_hide_status_bar=true&win_mode=fullscreen",

    "91vip": "https://ff66ccff.github.io/",

    "clazz_v_1": "http://www.71.cn/2025/0428/1261801.shtml",
    "clazz_v_2": "https://finance.ifeng.com/c/7sdSFWZbWym",
    "clazz_v_3": "https://tv.cctv.com/2020/11/18/VIDEmfb6H35D3lzid1nBJDga201118.shtml",
}

export function onRequest(context) {

    const responseGetters = [
        function(context) {
            const id = new URL(context.request.url).searchParams.get('id');
            if (id in goto) return redirect(goto[id]);
        },
        function(context) {
            const bv = new URL(context.request.url).searchParams.get('bv');
            if (bv) return redirect("https://www.bilibili.com/video/BV" + bv);
        }
    ]

    for (const responseGetter of responseGetters) {
        const response = responseGetter(context);
        if (response) return response;
    }
    return _404();

}

function redirect(url) {
    return new Response(null, {
        status: 302,
        headers: {
            'Location': url
        }
    });
}

function _404() {
    return Response.json({
        "success": false,
        "msg": "小沙雕翻遍了整个崩坏星穹铁道也找不着东西哇qwq"
    }, { status: 404 });
}