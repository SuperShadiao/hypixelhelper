export function onRequest(context) {

  let a = [
    "https://ys.mihoyo.com/",
    "https://www.bilibili.com/video/BV1uT4y1P7CX"
  ]
  
  return fetch(new URL(
    a [Math.floor(Math.random() * 2)]
  ))
  
}
