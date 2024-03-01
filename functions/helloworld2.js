export function onRequest(context) {

  // env.mappings.put("1", "2")
  // let s = env.mappings.get("1")
  
  return fetch(new URL("https://hh.xiaoshadiao.workers.dev/"))
}
