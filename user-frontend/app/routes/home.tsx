import { getPosts } from "~/api/postsApi";
import type { Route } from "./+types/home";
import PostCard from "~/components/PostCard";
import HomePagination from "~/components/Pagination";
import { useNavigation } from "react-router";
import LoadingThreeDotsPulse from "~/components/ui/LoadingThreeDotsPulse";
import { getCategories } from "~/api/categoriesApi";
import SiteFooter from "~/components/SiteFooter";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const categoryUri = url.searchParams.get("category");
  const page = url.searchParams.get("page");
  const { posts, postCount } = await getPosts(categoryUri, page);
  const { categories } = await getCategories();
  return { posts, postCount, page, categoryUri, categories };
}

export async function clientLoader({
  request,
  serverLoader,
}: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const categoryUri = url.searchParams.get("category");
  const page = url.searchParams.get("page");
  if (!categoryUri && !page) {
    return await serverLoader();
  }
  const { posts, postCount } = await getPosts(categoryUri, page);
  const { categories } = await getCategories();
  return { posts, postCount, page, categoryUri, categories };
}

clientLoader.hydrate = true;

export function meta() {
  return [
    { title: "Stacked Stories" },
    { property: "og:title", content: "Stacked Stories" },
    { name: "description", content: "A blog by Hilman Fikry" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts, postCount, page, categoryUri, categories } = loaderData;
  const navigation = useNavigation();

  return (
    <>
      <main className="flex flex-col items-start gap-10">
        {navigation.state === "loading" ? (
          <LoadingThreeDotsPulse className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        ) : (
          <>
            {categoryUri && (
              <h3 className="colored text-3xl font-black">
                {categories?.find(({ uri }: any) => uri === categoryUri).name}
              </h3>
            )}
            <div className="colored-container flex flex-col gap-5">
              {posts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <HomePagination page={page} postCount={postCount} />
          </>
        )}
      </main>
      <SiteFooter categories={categories} />
    </>
  );
}
