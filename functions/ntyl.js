export function onRequest(context) {

  let res = new Response("redirect", {
    status: 301
  })

  res.headers.append("Location", new URL(context.request.url).pathname + "/" + Math.floor(Math.random() * 3) + ".png")

  return res
}
