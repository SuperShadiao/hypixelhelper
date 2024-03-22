export async function onRequest(context) {
  let url = new URL(context.request.url)
  let type = url.searchParams.get('type');
  let name = url.searchParams.get('name');

  let key = (await ((await fetch(new URL("https://hypixelhelper.pages.dev/e.json"))).json())) ["api.linhun.vip.qqmusic.api.accesskey"]
  // return await context.env.ASSETS.fetch(new URL("https://api.linhun.vip/api/qqyy?name=" + name + "&y=1&n=1&apiKey=" + key))
  let res = await fetch(new URL("https://api.linhun.vip/api/qqyy?name=" + name + "&y=1&n=1&apiKey=" + key))

  if(type == "redirect" || type == "red") {
    return new Response('<script> window.location.replace("' + (await res.json()) ["mp3"] + '") </script>', headers:{"Content-Type": "text/html; charset=utf-8"})
  } else return res
 //  return await context.env.ASSETS.fetch(new URL("https://api.linhun.vip/api/qqyy?name=" + name + "&y=1&n=1&apiKey=" + key))
}
