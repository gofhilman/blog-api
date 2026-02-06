import { postLogin } from "~/api/authApi";
import type { Route } from "./+types/login-guest";
import { data, redirect } from "react-router";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  try {
    await postLogin(user);
    return redirect("/");
  } catch (error: any) {
    const errors = await error.json();
    return data({ errors }, { status: error.status });
  }
}