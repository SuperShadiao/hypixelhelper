export function onRequest(context) {
  let url = new URL(context.request.url).searchParams.get('url');
  return fetch(new URL( url ))
}
