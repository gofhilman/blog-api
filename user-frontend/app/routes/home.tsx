import { getPosts } from "~/api/postsApi";
import type { Route } from "./+types/home";
import PostCard from "~/components/PostCard";
import HomePagination from "~/components/Pagination";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const categoryUri = url.searchParams.get("category");
  const page = url.searchParams.get("page");
  const { posts, postCount } = await getPosts(categoryUri, page);
  return { posts, postCount, page };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts, postCount, page } = loaderData;

  return (
    <main>
      <title>Stacked Stories</title>
      <meta property="og:title" content="Stacked Stories" />
      <div>
        {posts.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <HomePagination page={page} postCount={postCount} />
    </main>
  );
}
