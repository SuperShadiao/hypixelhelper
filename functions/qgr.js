export async function onRequest(context) {
    const url = new URL(context.request.url);

    let qqgroup = url.searchParams.get("g");
    let file = url.searchParams.get("file");

    if(!file) {
        return context.next();
    }

    let filePath = "https://xiaoshadiao.club/sitesources/mds/qgr/" + qqgroup + "/" + file;

    let response = await fetch(filePath);
    let text = await response.text();
    if(!text.startsWith("<")) {
        return await fetch("https://xiaoshadiao.club/sitesources/mds/404.md");
    } else {
        return new Response(text, {
            headers: response.headers
        });
    }
}