import { Dot } from "lucide-react";
import { Separator } from "./ui/separator";
import { format } from "date-fns";

export default function PostItem({ post }: any) {
  return (
    <div>
      <div>
        <h3>{post.title}</h3>
        {(post.createdAt || post.categories.length > 0) && (
          <>
            <Separator orientation="vertical" />
            <p>
              {post.createdAt && format(post.createdAt, "MMMM d, y")}
              {post.createdAt &&
                post.categories.length > 0 &&
                " " + <Dot /> + " "}
              {post.categories.join(", ")}
            </p>
          </>
        )}
      </div>
      <div>
        
      </div>
    </div>
  );
}
