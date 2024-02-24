export function onRequest(context) {

  // console.log()
  // response.headers.append("Set-Cookie", `${cookieName}=${version}; path=/`)
  return context.env.ASSETS.fetch("/ntyl")
  
}
