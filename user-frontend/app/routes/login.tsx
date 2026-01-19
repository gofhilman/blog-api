import { postLogin } from "~/api/authApi";
import type { Route } from "./+types/login";
import { redirect } from "react-router";

export async function clientAction({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  await postLogin(user);
  return redirect("/" + params.postUri);
}
