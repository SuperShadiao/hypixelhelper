const goto = {
    "1": "https://github.com/ABCOA/Legacy-SoarClient",
    "2": "https://modrinth.com/mod/yqlossclientmixin",
    "3": "https://space.bilibili.com/524241250",
    "4": "https://maoyyds.cn",
    "5": "https://space.bilibili.com/1917949964",
    "6": "https://space.bilibili.com/3494361276877525",
    "7": "http://wt.4d4v.fun",
    "as": "/antiscamming"
}

export function onRequest(context) {

    const id = new URL(context.request.url).searchParams.get('id');
    return id in goto ? Response.redirect(goto[id]) : Response.json({
        "success": false,
        "msg": "小沙雕翻遍了整个崩坏星穹铁道也找不着东西哇qwq"
    }, { status: 404 });

}