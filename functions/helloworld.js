export function onRequest(context) {

  let old = context.env.oi
  context.env.oi = Math.random()
  
  return new Response(old + "Hello, world! " + context.env.oi)
}
