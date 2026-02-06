import { getPosts } from "~/api/postsApi";
import type { Route } from "./+types/home";
import { getCategories } from "~/api/categoriesApi";
import PostItem from "~/components/PostItem";
import { Form, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import CategoryItem from "~/components/CategoryItem";
import { getMe } from "~/api/authApi";
import { Plus } from "lucide-react";

export async function clientLoader() {
  const { user } = await getMe();
  if (!user || !["ADMIN", "GUEST"].includes(user.role)) {
    return redirect("/login");
  }
  const { posts } = await getPosts();
  const { categories } = await getCategories();
  return { posts, categories };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts, categories } = loaderData;

  return (
    <main className="flex flex-col gap-10">
      <title>Stacked Control</title>
      <meta property="og:title" content="Stacked Control" />
      <section className="flex flex-col gap-5">
        <h2 className="text-3xl font-black">Posts</h2>
        <Form action="posts" viewTransition>
          <Button type="submit" className="text-lg/tight">
            <Plus strokeWidth={3} /> Create new post
          </Button>
        </Form>
        <div className="flex flex-col gap-5">
          {posts.map((post: any) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <h2 className="text-3xl font-black">Categories</h2>
        <div className="flex flex-col gap-5">
          {categories.map((category: any) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}
