import throwError from "./throwError";

const authUrl = import.meta.env.VITE_API_ROOT_URL + "/auth/";

async function getMe() {
  const headers = new Headers();
  headers.append("Authorization", "bearer " + localStorage.getItem("JWT"));
  const response = await fetch(authUrl + "me", { headers });
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
  return { user: { username: user.username } };
}

async function postLogin(user: any) {
  const { token } = await postAuth("login", user);
  localStorage.setItem("JWT", token);
  return { user: { username: user.username } };
}

function postLogout() {
  localStorage.removeItem("JWT");
}

export { getMe, postSignup, postLogin, postLogout };
