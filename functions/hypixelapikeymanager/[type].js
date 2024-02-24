export function onRequest(context) {
  try {
    let key = new URL(context.request.url).searchParams.get('key');
    return fetch(new URL("https://hh.xiaoshadiao.workers.dev/hhapikeymanager?action=" + context.params.type + "&key=" + key))
  } catch(err) {
    return new Response(err);
  }
}
/*

  if(context.params.type == "puttempkey") {
    let jsonObj = JSON.parse(context.env.hypixelkey)
  
    let jsonObjKeyInfo = JSON.parse('{}')
  
    if(!(jsonObj.keys instanceof Array)) {
      jsonObj.keys = []
    }
    
    let url = new URL(context.request.url)
    let key = url.searchParams.get('key');
    let time = Date.now()
  
    jsonObjKeyInfo.key = key
    jsonObjKeyInfo.time = time
  
    jsonObj.keys[jsonObj.length] = jsonObjKeyInfo

    context.env.hypixelkey = JSON.stringify(jsonObj)
    
    return new Response("成功啦", {status: 200})
  } else if(context.params.type == "get") {
    return new Response(context.env.hypixelkey, {status: 200})
  } else {
    return new Response("别吵, 我在思考", {status: 403})
  }
  
*/
