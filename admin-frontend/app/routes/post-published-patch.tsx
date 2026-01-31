import { patchPostPublished } from "~/api/postsApi";
import type { Route } from "./+types/post-published-patch";

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  const post: any = Object.fromEntries(formData);
  if (!post.createdAt) post.createdAt = null;
  post.published = post.published === "1";
  return patchPostPublished(params.postUri, post);
}
