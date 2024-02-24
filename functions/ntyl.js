export function onRequest(context) {

  // console.log()
  // response.headers.append("Set-Cookie", `${cookieName}=${version}; path=/`)
  return new Response(context.env.ASSETS)
  
}
