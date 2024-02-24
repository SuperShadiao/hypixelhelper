export function onRequest(context) {

  env.hyp.put("1", "2")
  let s = env.hyp.get("1")
  
  return new Response("Hello, world! " + s)
}
