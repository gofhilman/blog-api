import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { Fragment } from "react/jsx-runtime";
import formatPublishedDate from "~/lib/formatPublishedDate";

export default function PostCard({ post }: any) {
  return (
    <article className="flex flex-col items-start gap-2">
      <Link to={post.uri} viewTransition>
        <h2 className="colored-children text-3xl font-black">{post.title}</h2>
      </Link>
      <div className="flex h-5 items-center space-x-4 text-sm">
        <Link to={post.uri} viewTransition>
          <p>{formatPublishedDate(post.createdAt)}</p>
        </Link>
        {post.categories.length > 0 && (
          <>
            <Separator orientation="vertical" className="bg-muted-foreground" />
            <p>
              {post.categories.map((category: any, index: any, array: any) => (
                <Fragment key={category.id}>
                  <Link to={"?category=" + category.uri} viewTransition>
                    {category.name}
                  </Link>
                  {index < array.length - 1 && ", "}
                </Fragment>
              ))}
            </p>
          </>
        )}
      </div>
      <Link to={post.uri} viewTransition>
        <p>{post.subtitle}</p>
      </Link>
    </article>
  );
}
