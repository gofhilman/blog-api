import { getMe } from "~/api/authApi";
import type { Route } from "./+types/post";
import { getComments, getSpecificPost } from "~/api/postsApi";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const { post } = await getSpecificPost(params.postUri);
  const commentsAndUser = Promise.all([getComments(params.postUri), getMe()]);
  return { post, commentsAndUser };
}

export default function Post({ loaderData }: Route.ComponentProps) {}
