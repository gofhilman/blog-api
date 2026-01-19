import { getMe } from "~/api/authApi";
import type { Route } from "./+types/post";
import { getComments, getSpecificPost } from "~/api/postsApi";
import { format } from "date-fns";
import { Suspense } from "react";
import Comments from "~/components/Comments";
import LoadingThreeDotsJumping from "~/components/ui/LoadingThreeDotsJumping";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const { post } = await getSpecificPost(params.postUri);
  const commentsAndUser = Promise.all([getComments(params.postUri), getMe()]);
  return { post, commentsAndUser };
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post, commentsAndUser } = loaderData;

  return (
    <main>
      <title>{post.title} &mdash; Stacked Stories</title>
      <meta
        property="og:title"
        content={post.title + " \u2014 Stacked Stories"}
      />
      <article>
        <section>
          <h2>{post.title}</h2>
          <p>{format(post.createdAt, "MMMM d, y")}</p>
          {post.content}
        </section>
        <section>
          <h3>Comments</h3>
          <Suspense fallback={<LoadingThreeDotsJumping />}>
            <Comments commentsAndUser={commentsAndUser} />
          </Suspense>
        </section>
      </article>
    </main>
  );
}
