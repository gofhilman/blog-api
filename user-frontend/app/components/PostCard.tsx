import { Link } from "react-router";
import { Separator } from "./ui/separator";

export default function PostCard({post}: any) {
  return (
    <Link to={post.uri}>
      <article>
        <h2>{post.title}</h2>
        <div className="flex h-5 items-center space-x-4 text-sm">
          <p>{post.createdAt}</p>
          <Separator orientation="vertical" />
          <p></p>
        </div>
        <p></p>
      </article>
    </Link>
  )
}