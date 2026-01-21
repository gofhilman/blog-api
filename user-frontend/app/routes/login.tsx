import { postLogin } from "~/api/authApi";
import type { Route } from "./+types/login";
import { data } from "react-router";

export async function clientAction({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  try {
    await postLogin(user);
  } catch (error: any) {
    const errors = await error.json();
    return data({ errors }, { status: error.status });
  }
}
