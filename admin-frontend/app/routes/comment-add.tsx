import { postComment } from "~/api/postsApi";
import type { Route } from "./+types/comment-add";
import { data } from "react-router";

export async function clientAction({ params, request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  try {
    return await postComment(params.postUri, formData.get("content"));
  } catch (error: any) {
    const errors = await error.json();
    return data({ errors }, { status: error.status });
  }
}