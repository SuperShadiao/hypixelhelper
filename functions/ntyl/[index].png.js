export function onRequest(context) {
  let res1 = context.next()
  if(res1.status == 404) {
    return new Response(res1.status)
  }
  return res1
}