import { patchCommentRead } from "~/api/postsApi";
import type { Route } from "./+types/comment-read-patch";
import { data } from "react-router";

export async function clientAction({ params }: Route.ClientActionArgs) {
  const { postUri, commentId } = params;
  try {
    return await patchCommentRead(postUri, commentId);
  } catch (error: any) {
    if (error instanceof Response) {
      const errors = await error
        .json()
        .catch(() => ["Failed to mark comment as read"]);
      return data({ errors }, { status: error.status });
    }
    return data(
      { errors: ["Failed to mark comment as read"] },
      { status: 500 },
    );
  }
}
