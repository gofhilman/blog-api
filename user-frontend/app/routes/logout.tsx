import { postLogout } from "~/api/authApi";
import type { Route } from "./+types/logout";
import { redirect } from "react-router";

export async function clientAction({ params }: Route.ActionArgs) {
  postLogout();
  return redirect("/" + params.postUri);
}
