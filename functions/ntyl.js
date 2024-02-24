export async function onRequest(context) {

  let i = 0

  let res1

  do {
    i++
    res1 = await context.env.ASSETS.fetch(new URL(context.request.url))
  } while(i < 100 && res1.status == 404)
  
  let res = new Response("redirect", {
    status: 301
  })

  res.headers.append("Location", new URL(context.request.url).pathname + "/" + (Math.floor(Math.random() * i) + 1) + ".png")

  return res
}
