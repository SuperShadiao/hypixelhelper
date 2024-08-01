export function onRequest(context) {
  let url = new URL(context.request.url).searchParams.get('url');
  
  return fetch(new URL( url ), {context.request.headers})
}

export function onRequestPost(context) {
  let url = new URL(context.request.url).searchParams.get('url');
  
  return fetch(new URL( url ), {method: "POST", body: context.request.body, headers: context.request.headers})
}
