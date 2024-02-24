export function onRequest(context) {

  console.log("hi")
  // response.headers.append("Set-Cookie", `${cookieName}=${version}; path=/`) //
  return context.next()
  
}
