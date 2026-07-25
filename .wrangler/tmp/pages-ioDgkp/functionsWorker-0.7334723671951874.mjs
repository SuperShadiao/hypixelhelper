var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// hypixelapikeymanager/[type].js
function onRequest(context) {
  try {
    let key = new URL(context.request.url).searchParams.get("key");
    return fetch(new URL("https://hh.xiaoshadiao.workers.dev/hhapikeymanager?action=" + context.params.type + "&key=" + key));
  } catch (err) {
    return new Response(err);
  }
}
__name(onRequest, "onRequest");

// ntyl/[index].png.js
async function onRequest2(context) {
  return context.next();
}
__name(onRequest2, "onRequest");

// xsdwk/[[xsdwk]].js
function onRequestPost(context) {
  let url = new URL(context.request.url);
  return fetch(new URL("https://hh.xiaoshadiao.workers.dev/" + url.pathname.substr(7) + url.search), { method: "POST", body: context.request.body, headers: context.request.headers });
}
__name(onRequestPost, "onRequestPost");
function onRequest3(context) {
  let url = new URL(context.request.url);
  return fetch(new URL("https://hh.xiaoshadiao.workers.dev/" + url.pathname.substr(7) + url.search), { headers: context.request.headers });
}
__name(onRequest3, "onRequest");

// datagetter.js
function onRequest4(context) {
  let url = new URL(context.request.url).searchParams.get("url");
  let target = new URL(url);
  let header = new Headers(context.request.headers);
  if (target.hostname == "api.github.com") {
    header.append("Authorization", "token " + context.env.github_key);
  }
  return fetch(target, { headers: header });
}
__name(onRequest4, "onRequest");
function onRequestPost2(context) {
  let url = new URL(context.request.url).searchParams.get("url");
  let target = new URL(url);
  let header = new Headers(context.request.headers);
  if (target.hostname == "api.github.com") {
    header.append("Authorization", "token " + context.env.github_key);
  }
  return fetch(target, { method: "POST", body: context.request.body, headers: header });
}
__name(onRequestPost2, "onRequestPost");

// freemusic.js
async function onRequest5(context) {
  let url = new URL(context.request.url);
  let type = url.searchParams.get("type");
  let name = url.searchParams.get("name");
  let res = await fetch(new URL("https://oiapi.net/API/QQ_Music/?msg=" + name + "&n=1"));
  if (type == "redirect" || type == "red") {
    return new Response('<script> window.location.replace("' + (await res.json())["data"]["music"] + '") <\/script>', { headers: { "Content-Type": "text/html; charset=utf-8" } });
  } else return res;
}
__name(onRequest5, "onRequest");

// gen_fishe_deploy_blp.js
async function onRequest6(context) {
  let res = await fetch("https://api.hypixel.net/v2/guild?id=61a9de838ea8c940a6e5c89c&key=40daffc0-2bf1-4d07-9434-1bc87ca7a880");
  let json = await res.json();
  let blpBuilderArr = [];
  let blpBuilder = {
    // "BlacklistedPlayers": []
  };
  for (let member of json["guild"]["members"]) {
    let tempObj = {};
    tempObj[member["uuid"]] = "autofishe";
    blpBuilderArr.push(tempObj);
  }
  blpBuilder["BlacklistedPlayers"] = blpBuilderArr;
  return Response.json(blpBuilder);
}
__name(onRequest6, "onRequest");

// gethypfreerank.js
function onRequest7(context) {
  return context.next();
}
__name(onRequest7, "onRequest");

// go.js
var goto = {
  "1": "https://github.com/ABCOA/Legacy-SoarClient",
  "2": "https://modrinth.com/mod/yqlossclientmixin",
  "3": "https://space.bilibili.com/524241250",
  "4": "https://maoyyds.cn",
  "5": "https://space.bilibili.com/1917949964",
  "6": "https://space.bilibili.com/3494361276877525",
  "7": "https://wt.4d4v.fun/about.html",
  "8": "https://space.bilibili.com/526689535",
  "as": "/antiscamming",
  "as_s2": "https://github.com/SuperShadiao/hypixelhelper/wiki/Discord%E9%98%B2%E9%AA%97%E8%AD%A6%E7%A4%BA#%E5%9C%BA%E6%99%AF2-skill-issue%E6%9D%A5%E7%9A%84%E5%B9%B6%E9%82%80%E8%AF%B7%E6%88%91%E5%8A%A0%E5%85%A5%E5%B7%B2%E7%BB%8F%E5%8A%A0%E8%BF%87%E7%9A%84%E6%9C%8D%E5%8A%A1%E5%99%A8",
  "100": "https://act.mihoyo.com/sr/event/e20251105return-tb31ya/index.html?utm_source=share&utm_medium=qr&utm_campaign=ingame&inviter=CAM8N2SKXN&mhy_landscape=true&mhy_auth_required=true&mhy_hide_status_bar=true&win_mode=fullscreen",
  "91vip": "https://ff66ccff.github.io/",
  "clazz_v_1": "http://www.71.cn/2025/0428/1261801.shtml",
  "clazz_v_2": "https://finance.ifeng.com/c/7sdSFWZbWym",
  "clazz_v_3": "https://tv.cctv.com/2020/11/18/VIDEmfb6H35D3lzid1nBJDga201118.shtml"
};
async function onRequest8(context) {
  const responseGetters = [
    function(context2) {
      const id = new URL(context2.request.url).searchParams.get("id");
      if (id in goto) return redirect(goto[id]);
    },
    function(context2) {
      const bv = new URL(context2.request.url).searchParams.get("bv");
      if (bv) return redirect("https://www.bilibili.com/video/BV" + bv);
    },
    async function(context2) {
      const id = new URL(context2.request.url).searchParams.get("id");
      let url;
      if (id) url = await context2.env.shortlink.get(id);
      if (url) return redirect(url);
    }
  ];
  for (const responseGetter of responseGetters) {
    const response = await responseGetter(context);
    if (response) return response;
  }
  return _404();
}
__name(onRequest8, "onRequest");
function redirect(url) {
  return new Response(null, {
    status: 302,
    headers: {
      "Location": url
    }
  });
}
__name(redirect, "redirect");
function _404() {
  return Response.json({
    "success": false,
    "msg": "\u5C0F\u6C99\u96D5\u7FFB\u904D\u4E86\u6574\u4E2A\u5D29\u574F\u661F\u7A79\u94C1\u9053\u4E5F\u627E\u4E0D\u7740\u4E1C\u897F\u54C7qwq"
  }, { status: 404 });
}
__name(_404, "_404");

// helloworld.js
function onRequest9(context) {
  let old = context.env.oi;
  context.env.oi = Math.random();
  return new Response(old + "Hello, world! " + context.env.oi);
}
__name(onRequest9, "onRequest");

// helloworld2.js
function onRequest10(context) {
  return fetch(new URL("https://hh.xiaoshadiao.workers.dev/"));
}
__name(onRequest10, "onRequest");

// hypixelhelperpack.xsd.js
async function onRequest11(context) {
  return fetch(new URL("https://github.com/SuperShadiao/hypixelhelper/releases/download/rp/hypixelhelperpack.xsd"));
}
__name(onRequest11, "onRequest");

// ntyl.js
async function onRequest12(context) {
  let i = 0;
  let res1;
  let url0 = new URL(context.request.url);
  if (parseInt(context.env.ntyl_pic_count) == 0 || Math.random() > 0.85 && parseInt(context.env.flushflag) > 10) {
    do {
      i++;
      let url1 = new URL(context.request.url);
      url1.pathname = url0.pathname + "/" + i + ".png";
      res1 = await context.env.ASSETS.fetch(url1);
    } while (i < 100 && res1.status == 200);
    context.env.ntyl_pic_count = i;
  } else {
    i = context.env.ntyl_pic_count;
    context.env.flushflag = parseInt(context.env.flushflag) + 1;
  }
  i--;
  let url2 = new URL(context.request.url);
  url2.pathname = url0.pathname + "/" + (Math.floor(Math.random() * i) + 1) + ".png";
  return context.env.ASSETS.fetch(url2);
}
__name(onRequest12, "onRequest");

// qgr.js
async function onRequest13(context) {
  const url = new URL(context.request.url);
  let qqgroup = url.searchParams.get("g");
  let file = url.searchParams.get("file");
  if (!file) {
    return context.next();
  }
  let filePath = "https://xiaoshadiao.club/sitesources/mds/qgr/" + qqgroup + "/" + file;
  let response = await context.env.ASSETS.fetch(filePath);
  let buffer = await response.arrayBuffer();
  if (String.fromCharCode.apply(null, new Uint8Array(buffer, 0, 2)).startsWith("<!")) {
    return context.env.ASSETS.fetch("https://xiaoshadiao.club/sitesources/mds/404.md");
  } else {
    return new Response(buffer, {
      headers: response.headers
    });
  }
}
__name(onRequest13, "onRequest");

// qgr_random_video.js
async function onRequest14(context) {
  const BVs = [
    "BV1dyXqBaEE5",
    "BV1P24y1a7Lt",
    "BV18X4y1N7Yh",
    "BV1tK4y1X7QP",
    "BV1ic411D7xo",
    "BV12HJBzHERG",
    "BV1XUoEBDEek",
    "BV1sV3xzfEXP",
    "BV1tUycYNEo5",
    "BV11UBfBMEfQ"
  ];
  const randomBV = BVs[Math.floor(Math.random() * BVs.length)];
  return Response.redirect("https://player.bilibili.com/player.html?isOutside=true&bvid=" + randomBV + "&page=1&high_quality=1&danmaku=1&autoplay=0&t=0");
}
__name(onRequest14, "onRequest");

// qqgroupmemberverify.js
async function onRequest15(context) {
  const url = new URL(context.request.url);
  let code = url.searchParams.get("code");
  let verifycode = generateRandomString1(5);
  const action = url.searchParams.get("action");
  const groupnumber = url.searchParams.get("groupnumber");
  const qqnumber = url.searchParams.get("qqnumber");
  const longtime = url.searchParams.get("longtime");
  const response = url.searchParams.get("response");
  const hook = url.searchParams.get("hook");
  if (action == "new") {
    code = generateRandomString1(7);
    verifycode = generateRandomString1(5);
    if (!groupnumber || !qqnumber || !longtime) {
      return new Response("\u53C2\u6570\u7F3A\u5931", { status: 400 });
    }
    const json = {
      verifycode,
      groupnumber,
      qqnumber
    };
    await context.env.gv.put(code, JSON.stringify(json), {
      expirationTtl: longtime == "true" ? 60 * 60 * 24 * 10 : 60 * 10
    });
    json.msg = "\u6210\u529F\u5566";
    json.code = code;
    const init = createJsonContentType();
    return new Response(JSON.stringify(json), init);
  } else if (action == "handle") {
    let obj = { success: false, msg: "\u672A\u77E5\u9519\u8BEF" };
    if (context.request.method !== "POST") {
      obj.msg = "\u8BF7\u4F7F\u7528POST\u8BF7\u6C42!";
      const response2 = Response.json(obj, { status: 405 });
      return response2;
    }
    const result = await doVerify(context, response);
    if (!result.success) {
      obj.msg = "\u9A8C\u8BC1\u5931\u8D25";
      const response2 = Response.json(obj, { status: 401 });
      return response2;
    }
    if (!code || !response) {
      obj.msg = "\u53C2\u6570\u7F3A\u5931";
      const response2 = Response.json(obj, { status: 400 });
      return response2;
    }
    const data = await context.env.gv.get(code);
    if (!data) {
      obj.msg = "\u9A8C\u8BC1\u4EE3\u7801" + code + "\u4E0D\u5B58\u5728";
      const response2 = Response.json(obj, { status: 404 });
      return response2;
    }
    obj = Object.assign(JSON.parse(data), obj);
    obj.code = code;
    obj.ip = result.ip;
    const json = obj;
    if (hook) {
      let hookurl;
      try {
        hookurl = new URL(hook);
        hookurl.searchParams.set("code", json.code);
        hookurl.searchParams.set("verifycode", json.verifycode);
        hookurl.searchParams.set("groupnumber", json.groupnumber);
        hookurl.searchParams.set("qqnumber", json.qqnumber);
        hookurl.searchParams.set("ip", json.ip);
      } catch (error) {
        obj.msg = `Hook ${hook} \u65E0\u6548!`;
        const response2 = Response.json(obj, { status: 400 });
        return response2;
      }
      try {
        const hookresponse = await (await fetch(hookurl)).text();
      } catch (error) {
      }
      obj.success = true;
      obj.msg = "\u5DF2\u5C1D\u8BD5\u8BF7\u6C42Hook! \u8BF7\u6C42\u662F\u5426\u6B63\u786E\u8BF7\u68C0\u67E5\u540E\u53F0";
      return Response.json(obj);
    }
    if (await (await fetch("https://hook.xiaoshadiao.club/qqgmv?code=" + json.code + "&verifycode=" + json.verifycode + "&groupnumber=" + json.groupnumber + "&qqnumber=" + json.qqnumber + "&ip=" + json.ip)).text() != "\u6210\u529F\u5566") {
      obj.msg = "\u9A8C\u8BC1\u6210\u529F\u4E86, \u4F46\u662F\u8BF7\u6C42\u7F51\u7EDC\u94A9\u5B50\u5931\u8D25\u4E86qwq, \u7B49\u5F855s\u540E\u91CD\u8BD5\u5427";
      const response2 = Response.json(obj, { status: 500 });
      return response2;
    }
    obj.success = true;
    obj.msg = "\u6210\u529F\u5566";
    return Response.json(obj);
  } else if (!action) {
    const data = await context.env.gv.get(code);
    if (data) {
      const json = JSON.parse(data);
      const rules = await context.env.ASSETS.fetch(new URL("https://xiaoshadiao.club/sitesources/mds/qgr/" + json.groupnumber + "/rules.md"));
      if (rules.status == 200) {
        const redirect2 = new URL("/qgr", context.request.url);
        redirect2.searchParams.append("g", json.groupnumber);
        redirect2.searchParams.append("qgvc", code);
        if (hook) redirect2.searchParams.append("hook", hook);
        return Response.redirect(redirect2);
      }
    }
    return context.next();
  }
  return new Response("\u53C2\u6570\u9519\u8BEF", { status: 400 });
}
__name(onRequest15, "onRequest");
function createJsonContentType() {
  return { headers: { "Content-Type": "application/json" } };
}
__name(createJsonContentType, "createJsonContentType");
function generateRandomString(length, chars) {
  let result = "";
  const charactersLength = chars.length;
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
__name(generateRandomString, "generateRandomString");
function generateRandomString1(length) {
  return generateRandomString(length, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
}
__name(generateRandomString1, "generateRandomString1");
async function doVerify(context, response) {
  const ip = context.request.headers.get("CF-Connecting-IP");
  let formData = new FormData();
  formData.append("secret", context.env.turnstile_qqgmv);
  formData.append("response", response);
  formData.append("remoteip", ip);
  const url2 = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url2, {
    body: formData,
    method: "POST"
  });
  const jsonData = await result.json();
  return { success: jsonData.success, ip };
}
__name(doVerify, "doVerify");

// randrainbowdog.js
async function onRequest16(context) {
  let i = 0;
  let indexText = await (await context.env.ASSETS.fetch(new URL("https://hypixelhelper.pages.dev"))).text();
  let res1;
  let url0 = new URL(context.request.url);
  const picCount = 10;
  do {
    i++;
    let url1 = new URL("https://hypixelhelper.pages.dev/rainbowdogs/" + Math.floor(picCount * Math.random()) + ".gif");
    res1 = await context.env.ASSETS.fetch(url1);
  } while (i < 100 && await res1.clone().text() == indexText);
  return res1;
}
__name(onRequest16, "onRequest");

// sitemap.xml.js
async function onRequest17(context) {
  const url = new URL(context.request.url);
  const host = url.hostname;
  const response = await context.next();
  const text = await response.text();
  return new Response(text.replace(/{URL}/g, host), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
__name(onRequest17, "onRequest");

// ZZ2Z_Lore.js
async function onRequest18(context) {
  let i = 0;
  let indexText = await (await context.env.ASSETS.fetch(new URL("https://hypixelhelper.pages.dev"))).text();
  let res1;
  let url0 = new URL(context.request.url);
  const picCount = 200;
  do {
    i++;
    let url1 = new URL(context.request.url);
    url1.pathname = url0.pathname + "/" + Math.floor(picCount * Math.random()) + ".jpg";
    res1 = await context.env.ASSETS.fetch(url1);
  } while (i < 100 && await res1.clone().text() == indexText);
  return res1;
}
__name(onRequest18, "onRequest");

// _middleware.js
var META_REPLACEMENT_CONTENT = `<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
        content="\u5C0F\u6C99\u96D5\u6B63\u5728\u7EF4\u62A4\u7684\u9879\u76EE, \u4F8B\u5982Minecraft Mod Hypixel Helper, XiaoShadiao Obfuscator(\u5C0F\u6C99\u96D5\u6DF7\u6DC6\u5668)\u7B49. \u5C0F\u6C99\u96D5\u7684\u4E2A\u4EBA\u7F51\u7AD9, \u62E5\u6709\u4E00\u4E9B\u5C0F\u9879\u76EE, \u6B63\u5728\u5236\u4F5C\u7684\u9879\u76EE\u6709: Minecraft Hypixel Helper Mod, Java XiaoShadiao Obfuscator\u7B49. \u6B22\u8FCE\u5927\u5BB6\u6765\u4E0E\u5C0F\u6C99\u96D5\u4E92\u52A8! qwq">
    <meta name="keywords" content="\u5C0F\u6C99\u96D5,\u4E2A\u4EBA\u7F51\u7AD9,awa,Java,Minecraft,Hypixel,Helper,Obfuscator,\u9879\u76EE,\u5F00\u53D1,xiaoshadiao">

    <!-- ICONS -->
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="64x64" href="icons/favicon-64x64.png">
    <link rel="icon" type="image/png" sizes="64x64" href="xsdv2.png">`;
async function onRequest19(context) {
  try {
    const res = await context.next();
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      const body = await res.text();
      console.log(body);
      const modifiedBody = body.replace("<!-- metareplacement -->", META_REPLACEMENT_CONTENT);
      console.log(modifiedBody);
      const newHeaders = new Headers(res.headers);
      newHeaders.delete("content-length");
      newHeaders.delete("content-encoding");
      newHeaders.delete("etag");
      return new Response(modifiedBody, {
        status: res.status,
        statusText: res.statusText,
        headers: newHeaders
      });
    }
    return res;
  } catch (err) {
    return new Response(`\u8BF7\u6C42\u7F51\u7AD9\u65F6\u53D1\u751F\u9519\u8BEF\u4E86\u55B5...: ${err.message}
${err.stack}`, { status: 500 });
  }
}
__name(onRequest19, "onRequest");

// ../.wrangler/tmp/pages-ioDgkp/functionsRoutes-0.44065266044947116.mjs
var routes = [
  {
    routePath: "/hypixelapikeymanager/:type",
    mountPath: "/hypixelapikeymanager",
    method: "",
    middlewares: [],
    modules: [onRequest]
  },
  {
    routePath: "/ntyl/:index.png",
    mountPath: "/ntyl",
    method: "",
    middlewares: [],
    modules: [onRequest2]
  },
  {
    routePath: "/xsdwk/:xsdwk*",
    mountPath: "/xsdwk",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/xsdwk/:xsdwk*",
    mountPath: "/xsdwk",
    method: "",
    middlewares: [],
    modules: [onRequest3]
  },
  {
    routePath: "/datagetter",
    mountPath: "/",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/datagetter",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest4]
  },
  {
    routePath: "/freemusic",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest5]
  },
  {
    routePath: "/gen_fishe_deploy_blp",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest6]
  },
  {
    routePath: "/gethypfreerank",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest7]
  },
  {
    routePath: "/go",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest8]
  },
  {
    routePath: "/helloworld",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest9]
  },
  {
    routePath: "/helloworld2",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest10]
  },
  {
    routePath: "/hypixelhelperpack.xsd",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest11]
  },
  {
    routePath: "/ntyl",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest12]
  },
  {
    routePath: "/qgr",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest13]
  },
  {
    routePath: "/qgr_random_video",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest14]
  },
  {
    routePath: "/qqgroupmemberverify",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest15]
  },
  {
    routePath: "/randrainbowdog",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest16]
  },
  {
    routePath: "/sitemap.xml",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest17]
  },
  {
    routePath: "/ZZ2Z_Lore",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest18]
  },
  {
    routePath: "/",
    mountPath: "/",
    method: "",
    middlewares: [onRequest19],
    modules: []
  }
];

// C:/Users/Administrator/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// C:/Users/Administrator/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");

// C:/Users/Administrator/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// C:/Users/Administrator/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-VCqo8d/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;

// C:/Users/Administrator/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-VCqo8d/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=functionsWorker-0.7334723671951874.mjs.map
