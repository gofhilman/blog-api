import { patchPostPublished } from "~/api/postsApi";
import type { Route } from "./+types/post-published-patch";
import { data } from "react-router";

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  const post: any = Object.fromEntries(formData);
  if (!post.createdAt) post.createdAt = null;
  post.published = post.published === "1";
  try {
    return await patchPostPublished(params.postUri, post);
  } catch (error: any) {
    const errors = await error.json();
    return data({ errors }, { status: error.status });
  }
}
