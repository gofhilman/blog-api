import { jsonContentHeaders, jwtHeaders } from "~/lib/httpHeaders";
import throwError from "./throwError";
import { fetchWithRetry } from "./fetchWithRetry";

const authUrl = import.meta.env.VITE_API_ROOT_URL + "/auth/";

async function getMe() {
  const headers = jwtHeaders(new Headers());
  const response = await fetchWithRetry(authUrl + "me", { headers });
  return response.ok ? await response.json() : { user: null };
}

async function postAuth(type: any, user: any) {
  const headers = jsonContentHeaders(new Headers());
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
}

async function postLogin(user: any) {
  const { token } = await postAuth("login", user);
  localStorage.setItem("JWT", token);
}

function postLogout() {
  localStorage.removeItem("JWT");
}

export { getMe, postSignup, postLogin, postLogout };
