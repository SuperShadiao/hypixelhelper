export function onRequestPost(context) {
  let url = new URL(context.request.url);

  // return new Response(new URL("https://hh.xiaoshadiao.workers.dev/" + url.pathname.substr(5) + url.search).href)
  return fetch(new URL("https://hh.xiaoshadiao.workers.dev/" + url.pathname.substr(7) + url.search), {method: "POST", body: context.request.body})
}

export function onRequest(context) {
  let url = new URL(context.request.url);

  // return new Response(new URL("https://hh.xiaoshadiao.workers.dev/" + url.pathname.substr(5) + url.search).href)
  return fetch(new URL("https://hh.xiaoshadiao.workers.dev/" + url.pathname.substr(7) + url.search))
}
