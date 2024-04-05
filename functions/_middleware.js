export async function onRequest(context) {
  try {
    const res = await context.next();
    return res
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}
