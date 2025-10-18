export function onRequest(context) {
    let id = new URL(context.request.url).searchParams.get('id');

    let response = null
    switch (id) {
        case '1':
            response = Response.redirect("https://github.com/ABCOA/Legacy-SoarClient");
            break;
        case '2':
            response = Response.redirect("https://modrinth.com/mod/yqlossclientmixin");
            break;
        case '3':
            response = Response.redirect("https://space.bilibili.com/524241250");
            break;
        case '4':
            response = Response.redirect("https://maoyyds.cn");
            break;
    }
    if (response == null) {
        return Response.json({
            "success": false,
            "msg": "小沙雕翻遍了整个崩坏星穹铁道也找不着东西哇qwq"
        }, { status: 404 });
    }
    return response;
}