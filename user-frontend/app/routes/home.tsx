import { getPosts } from "~/api/postsApi";
import type { Route } from "./+types/home";
import { Link } from "react-router";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const categoryUri = url.searchParams.get("category");
  const page = url.searchParams.get("page");
  const { posts, postCount } = await getPosts(categoryUri, page);
  return { posts, postCount };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts, postCount } = loaderData;

  return (
    <main>
      <title>Stacked Stories</title>
      <meta property="og:title" content="Stacked Stories" />
      {/* Test */}
      {/* <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link to={post.uri}>{post.title}</Link>
          </li>
        ))}
      </ul> */}
      <div>
        
      </div>
    </main>
  );
}
