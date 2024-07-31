export function onRequest(context) {
  let url = new URL(context.request.url).searchParams.get('url');
  return fetch(new URL( url ), {headers: context.request.headers})
}

export function onRequestPost(context) {
  let url = new URL(context.request.url).searchParams.get('url');

  return fetch(new URL( url ), {method: "POST", body: context.request.body, headers: context.request.headers})
  // return new Response(new URL("https://hh.xiaoshadiao.workers.dev/" + url.pathname.substr(5) + url.search).href)
  // return fetch(new URL("https://hh.xiaoshadiao.workers.dev/" + url.pathname.substr(7) + url.search), {method: "POST", body: context.request.body, headers: context.request.headers})
}
