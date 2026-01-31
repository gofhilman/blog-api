import { patchPostPublished } from "~/api/postsApi";
import type { Route } from "./+types/post-published-patch";

export async function clientAction({ params, request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const post = Object.fromEntries(formData);
  return patchPostPublished(params.postUri, post);
}
