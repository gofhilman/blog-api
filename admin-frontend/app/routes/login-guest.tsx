import { postLogin } from "~/api/authApi";
import type { Route } from "./+types/login-guest";
import { data, redirect } from "react-router";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  try {
    await postLogin(user);
    return redirect(`/?login=${user.toastId}`);
  } catch (error: any) {
    return redirect("/login");
  }
}
