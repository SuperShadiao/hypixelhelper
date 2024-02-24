export function onRequest(context) {
  return new Response(context.params.index)
}
