import { fetchWithRetry } from "./fetchWithRetry";
import throwError from "./throwError";

const authUrl = import.meta.env.VITE_API_ROOT_URL + "/auth/";

function getJwt() {
  if (typeof localStorage === "undefined") {
    return null;
  }

  return localStorage.getItem("JWT");
}

async function getMe() {
  const token = getJwt();

  if (!token) {
    return { user: null };
  }

  const headers = new Headers();
  headers.append("Authorization", "bearer " + token);
  const response = await fetchWithRetry(authUrl + "me", { headers });
  return response.ok ? await response.json() : { user: null };
}

async function postAuth(type: any, user: any) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetchWithRetry(authUrl + type, {
    method: "POST",
    headers,
    body: JSON.stringify(user),
  });
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function postSignup(user: any) {
  await postAuth("signup", user);
  await postLogin(user);
  return { user: { username: user.username } };
}

async function postLogin(user: any) {
  const { token } = await postAuth("login", user);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("JWT", token);
  }
  return { user: { username: user.username } };
}

function postLogout() {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("JWT");
  }
}

export { getMe, postSignup, postLogin, postLogout };
