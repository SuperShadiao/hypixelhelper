export function onRequest(context) {
  let url = new URL(context.request.url);

  return new Respnose(new URL("https://hh.xiaoshadiao.workers.dev/" + url.pathname.substr(5) + url.search).href)
  // return fetch(new URL("https://hh.xiaoshadiao.workers.dev/" + url.pathname.substr(5) + url.search))
}
