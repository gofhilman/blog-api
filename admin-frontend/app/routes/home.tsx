import { getPosts } from "~/api/postsApi";
import type { Route } from "./+types/home";
import { getCategories } from "~/api/categoriesApi";
import PostItem from "~/components/PostItem";
import { Form, redirect, useNavigation, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import CategoryItem from "~/components/CategoryItem";
import { getMe } from "~/api/authApi";
import { ArrowUpRight, Plus, SquareArrowOutUpRight } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import LoadingThreeDotsPulse from "~/components/ui/LoadingThreeDotsPulse";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    const login = searchParams.get("login");
    const postAdd = searchParams.get("post_add");
    if (login) {
      toast.success("You're now logged in", { id: +login });
      searchParams.delete("login");
      setSearchParams(searchParams);
    } else if (postAdd) {
      toast.success("Post has been added", { id: +postAdd });
      searchParams.delete("post_add");
      setSearchParams(searchParams);      
    }
  }, [searchParams, setSearchParams]);

  return (
    <main className="flex flex-col gap-10">
      <title>Stacked Control</title>
      <meta property="og:title" content="Stacked Control" />
      {navigation.state === "loading" ? (
        <LoadingThreeDotsPulse className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      ) : (
        <>
          <a href="https://dash.cloudflare.com/b27e283bc159bc215346d83f006c13b7/gofhilman.my.id">
            <div className="flex gap-2 items-center">
              <h2 className="colored self-start text-3xl font-black">Web Traffic</h2>
              <ArrowUpRight strokeWidth={2.5} />
            </div>
          </a>
          <section className="flex flex-col gap-5">
            <h2 className="colored self-start text-3xl font-black">Posts</h2>
            <Form action="posts" viewTransition>
              <Button
                type="submit"
                size="lg"
                className="colored-bg text-xl/tight font-bold"
              >
                <Plus strokeWidth={4} /> Create new post
              </Button>
            </Form>
            <div className="colored-container flex flex-col gap-5">
              {posts.map((post: any) => (
                <PostItem key={post.id} post={post} />
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-5">
            <h2 className="colored self-start text-3xl font-black">
              Categories
            </h2>
            <div className="colored-container flex flex-col gap-5">
              {categories.map((category: any) => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
