import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { format } from "date-fns";
import { Fragment } from "react/jsx-runtime";

export default function PostCard({ post }: any) {
  return (
    <article>
      <Link to={post.uri}>
        <h2>{post.title}</h2>
      </Link>
      <div className="flex h-5 items-center space-x-4 text-sm">
        <Link to={post.uri}>
          <p>{format(post.createdAt, "MMMM d, y")}</p>
        </Link>
        <Separator orientation="vertical" />
        <p>
          {post.categories.map((category: any, index: any, array: any) => (
            <Fragment key={category.id}>
              <Link to={"?category=" + category.uri}>{category.name}</Link>
              {index < array.length - 1 && ", "}
            </Fragment>
          ))}
        </p>
      </div>
      <Link to={post.uri}>
        <p>{post.subtitle}</p>
      </Link>
    </article>
  );
}
