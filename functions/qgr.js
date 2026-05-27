export async function onRequest(context) {
    const url = new URL(context.request.url);

    let qqgroup = url.searchParams.get("g");
    let file = url.searchParams.get("file");

    if(!file) {
        return context.next();
    }

    let filePath = "https://xiaoshadiao.club/sitesources/mds/qgr/" + qqgroup + "/" + file;

    let response = await fetch(filePath);
    let buffer = await response.arrayBuffer();
    if(String.fromCharCode.apply(null, new Uint8Array(buffer, 0, 2)).startsWith("<!")) {
        return fetch("https://xiaoshadiao.club/sitesources/mds/404.md");
    } else {
        return new Response(buffer, {
            headers: response.headers
        });
    }
}