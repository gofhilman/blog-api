import { getPosts } from "~/api/postsApi";
import type { Route } from "./+types/home";
import { getCategories } from "~/api/categoriesApi";
import PostItem from "~/components/PostItem";
import { Form, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import CategoryItem from "~/components/CategoryItem";
import { getMe } from "~/api/authApi";

export async function clientLoader() {
  const { user } = await getMe();
  if (!user) return redirect("login");
  const { posts } = await getPosts();
  const { categories } = await getCategories();
  return { posts, categories };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts, categories } = loaderData;

  return (
    <main>
      <title>Stacked Control</title>
      <meta property="og:title" content="Stacked Control" />
      <section>
        <h2>Posts</h2>
        <Form action="posts">
          <Button type="submit">Create new post</Button>
        </Form>
        <div>
          {posts.map((post: any) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </section>
      <section>
        <h2>Categories</h2>
        <div>
          {categories.map((category: any) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}
