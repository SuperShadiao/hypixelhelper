export function onRequest(context) {

  context.env.oi = Math.random()
  
  return new Response("Hello, world! " + context.env.oi)
}
