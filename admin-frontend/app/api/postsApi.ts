import { jsonContentJwtHeaders, jwtHeaders } from "~/lib/httpHeaders";
import throwError from "./throwError";
import { fetchWithRetry } from "./fetchWithRetry";

const postsUrl = import.meta.env.VITE_API_ROOT_URL + "/posts/";

async function getPosts() {
  const response = await fetchWithRetry(postsUrl);
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function getSpecificPost(postUri: any) {
  const response = await fetchWithRetry(postsUrl + postUri);
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function postPost(post: any) {
  const headers = jsonContentJwtHeaders(new Headers());
  const response = await fetchWithRetry(postsUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(post),
  });
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function putPost(postUri: any, post: any) {
  const headers = jsonContentJwtHeaders(new Headers());
  const response = await fetchWithRetry(postsUrl + postUri, {
    method: "PUT",
    headers,
    body: JSON.stringify(post),
  });
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function patchPostPublished(postUri: any, post: any) {
  const headers = jsonContentJwtHeaders(new Headers());
  const response = await fetchWithRetry(postsUrl + postUri, {
    method: "PATCH",
    headers,
    body: JSON.stringify(post),
  });
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function deletePost(postUri: any) {
  const headers = jwtHeaders(new Headers());
  const response = await fetchWithRetry(postsUrl + postUri, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function getComments(postUri: any) {
  const response = await fetchWithRetry(postsUrl + postUri + "/comments");
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function postComment(postUri: any, content: any) {
  const headers = jsonContentJwtHeaders(new Headers());
  const response = await fetchWithRetry(postsUrl + postUri + "/comments", {
    method: "POST",
    headers,
    body: JSON.stringify({ content }),
  });
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function patchCommentContent(postUri: any, commentId: any, content: any) {
  const headers = jsonContentJwtHeaders(new Headers());
  const response = await fetchWithRetry(
    postsUrl + postUri + "/comments/" + commentId + "/content",
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({ content }),
    },
  );
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function patchCommentRead(postUri: any, commentId: any) {
  const headers = jwtHeaders(new Headers());
  const response = await fetchWithRetry(
    postsUrl + postUri + "/comments/" + commentId + "/read",
    {
      method: "PATCH",
      headers,
    },
  );
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function deleteComment(postUri: any, commentId: any) {
  const headers = jwtHeaders(new Headers());
  const response = await fetchWithRetry(
    postsUrl + postUri + "/comments/" + commentId,
    {
      method: "DELETE",
      headers,
    },
  );
  if (!response.ok) await throwError(response);
  return await response.json();
}

export {
  getPosts,
  getSpecificPost,
  postPost,
  putPost,
  patchPostPublished,
  deletePost,
  getComments,
  postComment,
  patchCommentContent,
  patchCommentRead,
  deleteComment,
};
