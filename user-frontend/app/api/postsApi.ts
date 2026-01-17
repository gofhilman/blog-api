import throwError from "./throwError";

const postsUrl = import.meta.env.VITE_API_ROOT_URL + "/posts/";

async function getPosts(categoryUri?: any, page?: any) {
  const response = await fetch(
    postsUrl +
      "?published=1" +
      (categoryUri ? "&category=" + categoryUri : "") +
      (page ? "&page=" + page : "&page=1"),
  );
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function getSpecificPost(postUri: any) {
  const response = await fetch(postsUrl + postUri + "?published=1");
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function getComments(postUri: any) {
  const response = await fetch(postsUrl + postUri + "/comments");
  if (!response.ok) await throwError(response);
  return await response.json();
}

export { getPosts, getSpecificPost, getComments };
