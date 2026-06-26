import { getMe } from "~/api/authApi";
import type { Route } from "./+types/post";
import { getComments, getSpecificPost } from "~/api/postsApi";
import { Suspense, useEffect, useRef } from "react";
import Comments from "~/components/Comments";
import LoadingThreeDotsJumping from "~/components/ui/LoadingThreeDotsJumping";
import { useFetchers, useNavigation } from "react-router";
import LoadingThreeDotsPulse from "~/components/ui/LoadingThreeDotsPulse";
import formatPublishedDate from "~/lib/formatPublishedDate";
import "~/styles/editor-content.css";
import "~/styles/prism.css";
import "~/lib/prism.js";
import { getCategories } from "~/api/categoriesApi";
import SiteFooter from "~/components/SiteFooter";

declare global {
  interface Window {
    Prism?: any;
    com?: any;
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

  useEffect(() => {
    const renderContent = () => {
      if (!contentRef.current) return;
      if (window.com?.wiris?.js?.JsPluginViewer) {
        window.com.wiris.js.JsPluginViewer.parseElement(contentRef.current);
      }
      if (window.Prism) {
        window.Prism.highlightAllUnder(contentRef.current);
      }
    };

    if (window.com?.wiris?.js?.JsPluginViewer) {
      renderContent();
    } else {
      const script = document.getElementById("wiris-script");
      if (script) {
        script.addEventListener("load", renderContent);
        return () => script.removeEventListener("load", renderContent);
      }
    }
  }, [contentRef.current, fetchers.length, post.content]);

  return (
    <>
      <main>
        {navigation.state === "loading" ? (
          <LoadingThreeDotsPulse className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        ) : (
          <article className="flex flex-col gap-10">
            <section className="flex flex-col gap-1">
              <h2 className="text-3xl font-black">{post.title}</h2>
              <p className="text-sm">{formatPublishedDate(post.createdAt)}</p>
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
      <SiteFooter categories={categories} />
    </>
  );
}
