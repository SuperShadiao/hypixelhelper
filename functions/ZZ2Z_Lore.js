export async function onRequest(context) {

  let i = 0

  let res1
  let url0 = new URL(context.request.url)
  
  do {
    i++
    let url1 = new URL(context.request.url)
    url1.pathname = url0.pathname + "/" + i + ".jpg"
    res1 = await context.env.ASSETS.fetch(url1)
  } while(i < 100 && res1.status == 200)

  let res = new Response("redirect", {
    status: 301
  })

  res.headers.append("Location", new URL(context.request.url).pathname + "/" + (Math.floor(Math.random() * i) + 1) + ".jpg")

  return res
}