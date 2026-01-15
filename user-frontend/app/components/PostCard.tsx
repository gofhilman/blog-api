import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { format } from "date-fns";

export default function PostCard({ post }: any) {
  return (
    <Link to={post.uri}>
      <article>
        <h2>{post.title}</h2>
        <div className="flex h-5 items-center space-x-4 text-sm">
          <p>{format(post.createdAt, "MMMM d, y")}</p>
          <Separator orientation="vertical" />
          <p>
            {post.categories.reduce(
              (acc: any, category: any, index: any, array: any) => {
                acc.push(
                  <Link id={category.id} to={"?category=" + category.uri}>
                    {category.name}
                  </Link>,
                );
                if (index < array.length - 1) acc.push(", ");
                return acc;
              },
              [],
            )}
          </p>
        </div>
        <p>{post.subtitle}</p>
      </article>
    </Link>
  );
}
