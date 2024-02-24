export function onRequest(context) {

  let a = [
    "https://ys.mihoyo.com/",
    "https://www.bilibili.com/video/BV1uT4y1P7CX"
  ]

  let s = a [Math.floor(Math.random() * 2)]
  if(s.includes("bilibili")) {
    let res = new Response("redirect", {
      status: 301
    })
  
    res.headers.append("Location", a)
  
    return res
  } else return fetch(new URL( a ))
  
}
