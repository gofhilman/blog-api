import { postLogout } from "~/api/authApi";

export async function clientAction() {
  postLogout();
}
