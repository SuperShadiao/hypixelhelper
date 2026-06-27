export async function onRequest(context) {

    let res = await fetch("https://api.hypixel.net/v2/guild?id=61a9de838ea8c940a6e5c89c&key=40daffc0-2bf1-4d07-9434-1bc87ca7a880")
    let json = await res.json()

    let blpBuilderArr = []
    let blpBuilder = {
        // "BlacklistedPlayers": []
    }

    for (let member of json["guild"]["members"]) {
        let tempObj = {}
        tempObj[member["uuid"]] = "autofishe"
        blpBuilderArr.push(tempObj)
    }
    blpBuilder["BlacklistedPlayers"] = blpBuilderArr

    return Response.json(blpBuilder)

}