import { deleteComment } from "~/api/postsApi";
import type { Route } from "./+types/comment-delete";
import { data } from "react-router";

export async function clientAction({ params }: Route.ClientActionArgs) {
  const { postUri, commentId } = params;
  try {
    return await deleteComment(postUri, commentId);
  } catch (error: any) {
    const errors = await error.json();
    return data({ errors }, { status: error.status });
  }
}