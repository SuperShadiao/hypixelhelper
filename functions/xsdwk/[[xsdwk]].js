export function onRequestPost(context) {
  let url = new URL(context.request.url);
  
  return fetch(new URL("https://hh.xiaoshadiao.workers.dev/" + url.pathname.substr(7) + url.search), {method: "POST", body: context.request.body, context.request.headers})
}

export function onRequest(context) {
  let url = new URL(context.request.url);
  
  return fetch(new URL("https://hh.xiaoshadiao.workers.dev/" + url.pathname.substr(7) + url.search), {headers: context.request.headers})
}
