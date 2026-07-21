export async function onRequest(context) {
    
    const BVs = [
        "BV1dyXqBaEE5",
        "BV1P24y1a7Lt",
        "BV18X4y1N7Yh",
        "BV1tK4y1X7QP",
        "BV1ic411D7xo"
    ]

    const randomBV = BVs[Math.floor(Math.random() * BVs.length)];

    return Response.redirect("https://player.bilibili.com/player.html?isOutside=true&bvid=" + randomBV + "&page=1&high_quality=1&danmaku=1&autoplay=0&t=0");
}