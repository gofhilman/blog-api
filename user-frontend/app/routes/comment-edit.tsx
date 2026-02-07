import { putComment } from "~/api/postsApi";
import type { Route } from "./+types/comment-edit";
import { data } from "react-router";

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const { postUri, commentId } = params;
  const formData = await request.formData();
  try {
    return await putComment(postUri, commentId, formData.get("content"));
  } catch (error: any) {
    const errors = await error.json();
    return data({ errors }, { status: error.status });
  }
}
