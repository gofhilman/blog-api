import { getPosts } from "~/api/postsApi";
import type { Route } from "./+types/home";
import PostCard from "~/components/PostCard";
import HomePagination from "~/components/Pagination";
import { useNavigation } from "react-router";
import LoadingThreeDotsPulse from "~/components/ui/LoadingThreeDotsPulse";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const categoryUri = url.searchParams.get("category");
  const page = url.searchParams.get("page");
  const { posts, postCount } = await getPosts(categoryUri, page);
  return { posts, postCount, page };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts, postCount, page } = loaderData;
  const navigation = useNavigation();

  return (
    <main className="flex flex-col gap-10">
      <title>Stacked Stories</title>
      <meta property="og:title" content="Stacked Stories" />
      {navigation.state === "loading" ? (
        <LoadingThreeDotsPulse className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      ) : (
        <>
          <div className="colored-container flex flex-col gap-5">
            {posts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <HomePagination page={page} postCount={postCount} />
        </>
      )}
    </main>
  );
}
