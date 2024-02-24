export function onRequest(context) {
  // let res1 = context.next()
  // if(res1.status == 404) {
  //  return new Response("Code: " + res1.status)
  // }
  // return res1
  let res2 = await context.env.ASSETS.fetch(new URL(context.request.url))
  
  return new Response("Code: " + res2.status)
}
