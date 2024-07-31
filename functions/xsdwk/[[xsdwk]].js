export function onRequestPost(context) {
  let url = new URL(context.request.url);

  let headers = context.request.headers
  headers["cf-ipcountry"] = "SG"
  return fetch(new URL("https://hh.xiaoshadiao.workers.dev/" + url.pathname.substr(7) + url.search), {method: "POST", body: context.request.body, headers: headers})
}

export function onRequest(context) {
  let url = new URL(context.request.url);

  let headers = context.request.headers
  headers["cf-ipcountry"] = "SG"
  return fetch(new URL("https://hh.xiaoshadiao.workers.dev/" + url.pathname.substr(7) + url.search), {headers: headers})
}
