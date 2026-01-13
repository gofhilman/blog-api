export default async function throwError(res: any) {
  const errorData = await res.json();
  throw new Response(errorData.error.message, {
    status: res.status,
    statusText: errorData.error.message,
  });
}
