import { Dot } from "lucide-react";
import formatTime from "~/lib/formatTime";

export default function CommentCard({ comment, user }: any) {
  return (
    <article>
      <div>
        <p>
          {comment.user.username}
          {comment.user.role === "ADMIN" && " " + <span>(Author)</span>}
        </p>
        <Dot />
        <p>
          {comment.updatedAt
            ? formatTime(comment.updatedAt) + " (edited)"
            : formatTime(comment.createdAt)}
        </p>
      </div>
      <p>{comment.content}</p>
      <div>
        <button></button>
        <button></button>
      </div>
    </article>
  );
}
