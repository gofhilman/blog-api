import { fetchWithRetry } from "./fetchWithRetry";
import throwError from "./throwError";

const postsUrl = import.meta.env.VITE_API_ROOT_URL + "/posts/";

function getJwt() {
  if (typeof localStorage === "undefined") {
    return null;
  }

  return localStorage.getItem("JWT");
}

async function getAllPosts() {
  const response = await fetchWithRetry(postsUrl);
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function getPosts(categoryUri?: any, page?: any) {
  const response = await fetchWithRetry(
    postsUrl +
      "?published=1" +
      (categoryUri ? "&category=" + categoryUri : "") +
      (page ? "&page=" + page : "&page=1"),
  );
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function getSpecificPost(postUri: any) {
  const response = await fetchWithRetry(postsUrl + postUri + "?published=1");
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function getComments(postUri: any) {
  const response = await fetchWithRetry(postsUrl + postUri + "/comments");
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function postComment(postUri: any, content: any) {
  const headers = new Headers();
  const token = getJwt();
  if (token) {
    headers.append("Authorization", "bearer " + token);
  }
  headers.append("Content-Type", "application/json");
  const response = await fetchWithRetry(postsUrl + postUri + "/comments", {
    method: "POST",
    headers,
    body: JSON.stringify({ content }),
  });
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function patchCommentContent(postUri: any, commentId: any, content: any) {
  const headers = new Headers();
  const token = getJwt();
  if (token) {
    headers.append("Authorization", "bearer " + token);
  }
  headers.append("Content-Type", "application/json");
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
  const headers = new Headers();
  const token = getJwt();
  if (token) {
    headers.append("Authorization", "bearer " + token);
  }
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
  const headers = new Headers();
  const token = getJwt();
  if (token) {
    headers.append("Authorization", "bearer " + token);
  }
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
  getAllPosts,
  getPosts,
  getSpecificPost,
  getComments,
  postComment,
  patchCommentContent,
  patchCommentRead,
  deleteComment,
};
