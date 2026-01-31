import { deletePost } from "~/api/postsApi";
import type { Route } from "./+types/post-delete";
import { data } from "react-router";

export async function clientAction({ params }: Route.ClientActionArgs) {
  try {
    return await deletePost(params.postUri);
  } catch (error: any) {
    const errors = await error.json();
    return data({ errors }, { status: error.status });
  }
}