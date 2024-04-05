export async function onRequest(context) {
  try {
    const res = await context.next();
    if(res == 404) return new Response("ei", 200)
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}
