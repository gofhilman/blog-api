import { getPosts } from "~/api/postsApi";
import type { Route } from "./+types/home";
import { getCategories } from "~/api/categoriesApi";
import PostItem from "~/components/PostItem";
import {
  data,
  Form,
  redirect,
  useFetcher,
  useNavigation,
  useSearchParams,
} from "react-router";
import { Button } from "~/components/ui/button";
import CategoryItem from "~/components/CategoryItem";
import { getMe } from "~/api/authApi";
import { ArrowUpRight, Plus } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import LoadingThreeDotsPulse from "~/components/ui/LoadingThreeDotsPulse";
import { getLatestDeployment, postDeployment } from "~/api/deploymentApi";
import formatTime from "~/lib/formatTime";

export async function clientAction() {
  try {
    return await postDeployment();
  } catch (error: any) {
    const errors = await error.json();
    return data({ errors }, { status: error.status });
  }
}

export async function clientLoader() {
  const { user } = await getMe();
  if (!user || !["ADMIN", "GUEST"].includes(user.role)) {
    return redirect("/login");
  }
  const { posts } = await getPosts();
  const { categories } = await getCategories();
  const { latestDeployment } = await getLatestDeployment();
  return { posts, categories, latestDeployment };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts, categories, latestDeployment } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const deploymentFetcher = useFetcher();
  const loadingToast = useRef<any>(null);

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

  if (deploymentFetcher.state === "idle") {
    const id = loadingToast.current;
    if (id) {
      loadingToast.current = null;
      if (deploymentFetcher.data?.errors) {
        toast.error("Failed to deploy posts", { id });
      } else {
        toast.success("Posts has been deployed", { id });
      }
    }
  }

  return (
    <main className="flex flex-col gap-10">
      <title>Stacked Control</title>
      <meta property="og:title" content="Stacked Control" />
      {navigation.state === "loading" ? (
        <LoadingThreeDotsPulse className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      ) : (
        <>
          <a href="https://dash.cloudflare.com/b27e283bc159bc215346d83f006c13b7/gofhilman.my.id">
            <div className="flex items-center gap-2">
              <h2 className="colored self-start text-3xl font-black">
                Web Traffic
              </h2>
              <ArrowUpRight strokeWidth={2.5} />
            </div>
          </a>
          <section className="flex flex-col gap-5">
            <h2 className="colored self-start text-3xl font-black">Posts</h2>
            <div className="flex justify-between">
              <Form action="posts" viewTransition>
                <Button
                  type="submit"
                  size="lg"
                  className="colored-bg text-lg/tight font-bold"
                >
                  <Plus strokeWidth={4} /> Create new post
                </Button>
              </Form>
              <deploymentFetcher.Form
                method="post"
                onSubmit={() => {
                  const id = toast.loading("Deploying posts...");
                  loadingToast.current = id;
                }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="text-lg/tight font-bold"
                >
                  Deploy posts
                </Button>
              </deploymentFetcher.Form>
            </div>
            {latestDeployment && (
              <p className="font-medium">
                Latest deployment: {formatTime(latestDeployment.createdAt)}
              </p>
            )}
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
