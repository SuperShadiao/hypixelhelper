export async function onRequest(context) {

  let i = 0

  let res1
  let url0 = new URL(context.request.url)

  if(parseInt(context.env.zz2z_lore_pic_count) == 0 || (Math.random() > 0.85 && parseInt(context.env.flushflag) > 10)) {
    do {
      i++
      let url1 = new URL(context.request.url)
      url1.pathname = url0.pathname + "/" + i + ".jpg"
      res1 = await context.env.ASSETS.fetch(url1)
    } while(i < 100 && res1.status == 200)
    context.env.zz2z_lore_pic_count = i
  } else {
    i = context.env.zz2z_lore_pic_count
    context.env.flushflag = parseInt(context.env.flushflag) + 1
  }
  i--
  let url2 = new URL(context.request.url)
  url2.pathname = url0.pathname + "/" + (Math.floor(Math.random() * i) + 1) + ".jpg"
  return context.env.ASSETS.fetch(url2)
}

  // let res = new Response("redirect", {
  //   status: 301
  // })

  // res.headers.append("Location", new URL(context.request.url).pathname + "/" + (Math.floor(Math.random() * i) + 1) + ".jpg")

  // return res

  // let res2 = await context.env.ASSETS.fetch(new URL(url0.pathname + "/" + (Math.floor(Math.random() * i) + 1) + ".jpg"))

  // return new Response(res2.body) 
