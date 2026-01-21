import { postLogin } from "~/api/authApi";
import type { Route } from "./+types/login";
import { isRouteErrorResponse, redirect } from "react-router";
import { errorContext } from "~/context";

export async function clientAction({
  params,
  request,
  context,
}: Route.ActionArgs) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  try {
    await postLogin(user);
  } catch (error: any) {
    const message = await error.text();
    context.set(errorContext, { code: error.status, message });
  }
  return redirect("/" + params.postUri);
}
