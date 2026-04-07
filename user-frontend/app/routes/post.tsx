import { getMe } from "~/api/authApi";
import type { Route } from "./+types/post";
import { getComments, getSpecificPost } from "~/api/postsApi";
import { format } from "date-fns";
import { Suspense, useEffect, useRef } from "react";
import Comments from "~/components/Comments";
import LoadingThreeDotsJumping from "~/components/ui/LoadingThreeDotsJumping";
import { Link, useFetchers, useLocation, useNavigation } from "react-router";
import LoadingThreeDotsPulse from "~/components/ui/LoadingThreeDotsPulse";
import "~/styles/editor-content.css";
import "~/styles/prism.css";
import "~/lib/prism.js";
import { getCategories } from "~/api/categoriesApi";

declare global {
  interface Window {
    Prism?: any;
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const { post } = await getSpecificPost(params.postUri);
  const { categories } = await getCategories();
  return { post, commentsAndUser: null, categories };
}

export async function clientLoader({
  params,
  serverLoader,
}: Route.ClientLoaderArgs) {
  const { post, categories } = await serverLoader();
  const commentsAndUser = Promise.all([getComments(params.postUri), getMe()]);
  return { post, commentsAndUser, categories };
}

clientLoader.hydrate = true;

export function meta({ loaderData }: Route.MetaArgs) {
  const title = `${loaderData.post.title} \u2014 Stacked Stories`;

  return [
    { title },
    { property: "og:title", content: title },
    { name: "description", content: loaderData.post.subtitle },
  ];
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post, commentsAndUser, categories } = loaderData;
  const navigation = useNavigation();
  const contentRef = useRef<HTMLDivElement>(null);
  const fetchers = useFetchers();
  const path = useLocation().pathname;

  useEffect(() => {
    if (window.Prism && contentRef.current) {
      window.Prism.highlightAllUnder(contentRef.current);
    }
  }, [contentRef.current, fetchers.length]);

  return (
    <>
      <main>
        {navigation.state === "loading" ? (
          <LoadingThreeDotsPulse className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        ) : (
          <article className="flex flex-col gap-10">
            <section className="flex flex-col gap-1">
              <h2 className="text-3xl font-black">{post.title}</h2>
              <p className="text-sm">{format(post.createdAt, "MMMM d, y")}</p>
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="post-content mt-8"
                ref={contentRef}
              ></div>
            </section>
            <section className="flex flex-col gap-5">
              <h3 className="text-xl font-black">Comments</h3>
              {commentsAndUser ? (
                <Suspense
                  fallback={<LoadingThreeDotsJumping className="my-10" />}
                >
                  <Comments commentsAndUser={commentsAndUser} />
                </Suspense>
              ) : (
                <LoadingThreeDotsJumping className="my-10" />
              )}
            </section>
          </article>
        )}
      </main>
      <footer className="mt-auto flex flex-col items-start gap-5">
        <article className="flex flex-col gap-1">
          <h4
            className={
              "text-xl font-extrabold" + (path === "/" ? " colored" : "")
            }
          >
            Categories
          </h4>
          <ul className={path === "/" ? "colored-container" : ""}>
            {categories.map((category: any) => (
              <li
                key={category.id}
                className={
                  "font-bold" + (path === "/" ? " colored-children" : "")
                }
              >
                <Link to={"/?category=" + category.uri} viewTransition>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </article>
        <p className={"text-2xl font-black" + (path === "/" ? "" : " colored")}>
          <Link to="/" viewTransition>
            Stacked Stories
          </Link>
        </p>
      </footer>
    </>
  );
}
