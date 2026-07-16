const META_REPLACEMENT_CONTENT = `    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
        content="小沙雕正在维护的项目, 例如Minecraft Mod Hypixel Helper, XiaoShadiao Obfuscator(小沙雕混淆器)等. 小沙雕的个人网站, 拥有一些小项目, 正在制作的项目有: Minecraft Hypixel Helper Mod, Java XiaoShadiao Obfuscator等. 欢迎大家来与小沙雕互动! qwq">
    <meta name="keywords" content="小沙雕,个人网站,awa,Java,Minecraft,Hypixel,Helper,Obfuscator,项目,开发,xiaoshadiao">

    <!-- ICONS -->
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="64x64" href="icons/favicon-64x64.png">
    <link rel="icon" type="image/png" sizes="64x64" href="xsdv2.png">`;

export async function onRequest(context) {
  try {
    const res = await context.next();
    
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      const body = await res.text();
      const modifiedBody = body.replace('<metareplacement/>', META_REPLACEMENT_CONTENT);
      
      const newHeaders = new Headers(res.headers);
      newHeaders.delete('content-length');
      newHeaders.delete('content-encoding');
      newHeaders.delete('etag');
      
      return new Response(modifiedBody, {
        status: res.status,
        statusText: res.statusText,
        headers: newHeaders
      });
    }
    
    return res;
  } catch (err) {
    return new Response(`请求网站时发生错误了喵...: ${err.message}\n${err.stack}`, { status: 500 });
  }
}