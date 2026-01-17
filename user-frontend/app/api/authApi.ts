import throwError from "./throwError";

const authUrl = import.meta.env.VITE_API_ROOT_URL + "/auth/";

async function getMe() {
  const response = await fetch(authUrl + "me");
  return response.ok ? await response.json() : { user: null };
}

async function postAuth(type: any, user: any) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetch(authUrl + type, {
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
