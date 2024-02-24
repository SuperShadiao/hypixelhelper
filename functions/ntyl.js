export function onRequest(context) {

  console.log(context.env.ASSETS.fetch("/ntyl"))
  // response.headers.append("Set-Cookie", `${cookieName}=${version}; path=/`)
  return context.next()
  
}
