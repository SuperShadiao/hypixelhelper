export async function onRequest(context) {
  let url = new URL(context.request.url)
  let type = url.searchParams.get('type');
  let name = url.searchParams.get('name');

  let key = JSON.parse(await fetch("https://hypixelhelper.pages.dev/e.json")) ["api.linhun.vip.qqmusic.api.accesskey"]
  return await fetch(new URL("https://api.linhun.vip/api/qqyy?name=" + name + "&y=1&n=1&apiKey=" + key))
}