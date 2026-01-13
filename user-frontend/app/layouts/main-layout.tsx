import { getPosts } from "~/api/postsApi";
import type { Route } from "./+types/main-layout";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const categoryUri = url.searchParams.get("category");
  const posts = await getPosts(categoryUri);
  return { posts };
}

export default function MainLayout({ loaderData }: Route.ComponentProps) {}
