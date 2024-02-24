async function onRequest(context) {

  let i = context.params.index

  let res
  res = await context.env.ASSETS.fetch(new URL(context.request.url))
  
  return new Response("Code: " + res.status)
  
}
