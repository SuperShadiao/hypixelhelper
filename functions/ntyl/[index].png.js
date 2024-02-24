export function onRequest(context) {
  let res1 = context.next()
  if(res1.status == 404) {
    return new Response(context.params.index)
  }
  return res1
}
