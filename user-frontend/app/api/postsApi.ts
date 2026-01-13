import throwError from "./throwError";

async function getPosts(categoryUri?: any) {
  const response = await fetch(
    import.meta.env.VITE_API_ROOT_URL +
      (categoryUri ? "/?category=" + categoryUri : "/"),
  );
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function getSpecificPost(postUri: any) {
  const response = await fetch(
    import.meta.env.VITE_API_ROOT_URL + "/" + postUri,
  );
  if (!response.ok) await throwError(response);
  return await response.json();
}

export { getPosts, getSpecificPost };
