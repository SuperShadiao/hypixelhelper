export function onRequest(context) {
  let url = new URL(context.request.url);
  
  return new Response(url.href)
}
