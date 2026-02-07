import { getMe } from "~/api/authApi";
import type { Route } from "./+types/post";
import { getComments, getSpecificPost } from "~/api/postsApi";
import { format } from "date-fns";
import { Suspense } from "react";
import Comments from "~/components/Comments";
import LoadingThreeDotsJumping from "~/components/ui/LoadingThreeDotsJumping";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { post } = await getSpecificPost(params.postUri);
  const commentsAndUser = Promise.all([getComments(params.postUri), getMe()]);
  return { post, commentsAndUser };
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post, commentsAndUser } = loaderData;

  return (
    <main>
      <title>{`${post.title} \u2014 Stacked Stories`}</title>
      <meta
        property="og:title"
        content={post.title + " \u2014 Stacked Stories"}
      />
      <article className="flex flex-col gap-10">
        <section className="flex flex-col gap-0.5">
          <h2 className="text-3xl font-black">{post.title}</h2>
          <p className="text-sm">{format(post.createdAt, "MMMM d, y")}</p>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="mt-5"
          ></div>
        </section>
        <section className="flex flex-col gap-5">
          <h3 className="text-xl font-black">Comments</h3>
          <Suspense fallback={<LoadingThreeDotsJumping />}>
            <Comments commentsAndUser={commentsAndUser} />
          </Suspense>
        </section>
      </article>
    </main>
  );
}
