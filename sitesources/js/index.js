if(document.location.pathname != "/") {
    // document.location.replace("https://github.com/SuperShadiao/hypixelhelper");

    let res = await fetch("/404");
    let body = await res.text();
    document.write(body);

}