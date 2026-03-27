export async function onRequest(context) {
    const url = new URL(context.request.url);

    const host = url.hostname;

    const response = await context.next();
    const text = await response.text();


    return new Response(text.replace("{URL}", host), {
        headers: {
            "Content-Type": "application/xml; charset=utf-8"
        }
    });
}
