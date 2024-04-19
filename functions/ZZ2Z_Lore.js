export async function onRequest(context) {

  let i = 0
  let indexText = await ((await context.env.ASSETS.fetch(new URL("https://hypixelhelper.pages.dev"))).text())

  let res1
  let url0 = new URL(context.request.url)
  const picCount = 200

  do {
    i++
    let url1 = new URL(context.request.url)
    url1.pathname = url0.pathname + "/" + Math.floor(picCount * Math.random()) + ".jpg"
    res1 = await context.env.ASSETS.fetch(url1)
  } while(i < 100 && await (res1.clone().text()) == indexText)

  return res1
}

  // let res = new Response("redirect", {
  //   status: 301
  // })

  // res.headers.append("Location", new URL(context.request.url).pathname + "/" + (Math.floor(Math.random() * i) + 1) + ".jpg")

  // return res

  // let res2 = await context.env.ASSETS.fetch(new URL(url0.pathname + "/" + (Math.floor(Math.random() * i) + 1) + ".jpg"))

  // return new Response(res2.body) 
