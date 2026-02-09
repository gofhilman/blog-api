import { getMe } from "~/api/authApi";
import type { Route } from "./+types/post";
import { getComments, getSpecificPost } from "~/api/postsApi";
import { format } from "date-fns";
import { Suspense, useEffect, useRef } from "react";
import Comments from "~/components/Comments";
import LoadingThreeDotsJumping from "~/components/ui/LoadingThreeDotsJumping";
import { useNavigation } from "react-router";
import LoadingThreeDotsPulse from "~/components/ui/LoadingThreeDotsPulse";
import "~/styles/editor-content.css";
import "~/styles/prism.css";
import "~/lib/prism.js";

declare global {
  interface Window {
    Prism?: any;
  }
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { post } = await getSpecificPost(params.postUri);
  const commentsAndUser = Promise.all([getComments(params.postUri), getMe()]);
  return { post, commentsAndUser };
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post, commentsAndUser } = loaderData;
  const navigation = useNavigation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.Prism && contentRef.current) {
      window.Prism.highlightAllUnder(contentRef.current);
    }
  }, [contentRef.current]);

  return (
    <main>
      <title>{`${post.title} \u2014 Stacked Stories`}</title>
      <meta
        property="og:title"
        content={post.title + " \u2014 Stacked Stories"}
      />
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
            <Suspense fallback={<LoadingThreeDotsJumping />}>
              <Comments commentsAndUser={commentsAndUser} />
            </Suspense>
          </section>
        </article>
      )}
    </main>
  );
}
