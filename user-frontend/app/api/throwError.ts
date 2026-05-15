export default async function throwError(res: any) {
  let messages = [res.statusText || "Request failed"];

  try {
    const errorData = await res.clone().json();
    const message = errorData?.error?.message;
    messages = Array.isArray(message)
      ? message
      : message
        ? [message]
        : messages;
  } catch {
    const text = await res.text();
    if (text) messages = [text];
  }

  throw new Response(JSON.stringify(messages), {
    status: res.status,
  });
}
