export async function onRequest(context) {

  let i = 0

  let res1
  let url0 = new URL(context.request.url)

  if(parseInt(context.env.ntyl_pic_count) == 0 || (Math.random() > 0.85 && parseInt(context.env.flushflag) > 10)) {
    do {
      i++
      let url1 = new URL(context.request.url)
      url1.pathname = url0.pathname + "/" + i + ".png"
      res1 = await context.env.ASSETS.fetch(url1)
    } while(i < 100 && res1.status == 200)
  
    context.env.ntyl_pic_count = i
  } else {
    i = context.env.ntyl_pic_count
    context.env.flushflag = parseInt(context.env.flushflag) + 1
  }

  let res = new Response("redirect", {
    status: 301
  })
  res.headers.append("Location", new URL(context.request.url).pathname + "/" + (Math.floor(Math.random() * i) + 1) + ".png")

  return res
}
