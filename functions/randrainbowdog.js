export async function onRequest(context) {

  let i = 0
  let indexText = await ((await context.env.ASSETS.fetch(new URL("https://hypixelhelper.pages.dev"))).text())

  let res1
  let url0 = new URL(context.request.url)
  const picCount = 10

  do {
    i++
    let url1 = new URL(context.request.url)
    url1.pathname = "https://hypixelhelper.pages.dev/rainbowdogs/" + Math.floor(picCount * Math.random()) + ".gif"
    res1 = await context.env.ASSETS.fetch(url1)
  } while(i < 100 && await (res1.clone().text()) == indexText)

  return res1
}
