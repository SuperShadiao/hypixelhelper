export async function onRequest(context) {
    const url = new URL(context.request.url);

    const host = url.hostname;

    const response = await context.next();
    
    response.body = response.body.replace("{URL}", host);
    return response;
}