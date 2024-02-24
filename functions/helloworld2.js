export function onRequest(context) {

  context.env.hyp.put("1", "2")
  let s = context.env.hyp.get("1")
  
  return new Response("Hello, world! " + s)
}
