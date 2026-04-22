export function onRequest(context) {
  let url = new URL(context.request.url).searchParams.get('url');
  
  let target = new URL( url )
  let header = new Headers(context.request.headers)
  if(target.hostname == "api.github.com") {
    header.append("Authorization", "token " + context.env.github_key)
  }
  return fetch(target, {headers: header})
}

export function onRequestPost(context) {
  let url = new URL(context.request.url).searchParams.get('url');
  
  let target = new URL( url )
  let header = new Headers(context.request.headers)
  if(target.hostname == "api.github.com") {
    header.append("Authorization", "token " + context.env.github_key)
  }
  return fetch(target, {method: "POST", body: context.request.body, headers: header})
}
