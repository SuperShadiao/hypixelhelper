export function onRequest(context) {
  let url = context.request.url.searchParams.get('url');
  return fetch(new URL( url ))
}
