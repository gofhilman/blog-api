import { patchCommentRead } from "~/api/postsApi";
import type { Route } from "./+types/comment-read-patch";
import { data } from "react-router";

export async function clientAction({ params }: Route.ClientActionArgs) {
  const { postUri, commentId } = params;
  try {
    return await patchCommentRead(postUri, commentId);
  } catch (error: any) {
    const errors = await error.json();
    return data({ errors }, { status: error.status });
  }
}
