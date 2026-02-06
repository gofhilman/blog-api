import { useEffect, useRef } from "react";
import CommentCard from "./CommentCard";
import { useFetcher, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import FormErrors from "./FormErrors";
import { toast } from "sonner";

export default function Comments({ comments }: any) {
  const commentAddFetcher = useFetcher();
  const commentAddFormRef = useRef<HTMLFormElement | null>(null);
  const commentAddErrors = commentAddFetcher.data?.errors;
  const loadingToasts = useRef(new Map());

  useEffect(() => {
    if (commentAddFetcher.data && !commentAddErrors) {
      commentAddFormRef.current?.reset();
    }
  }, [commentAddFetcher.data, commentAddErrors]);

  if (commentAddFetcher.data) {
    const id = loadingToasts.current.get("comment-add");
    if (id) {
      loadingToasts.current.delete("comment-add");
      if (commentAddErrors) {
        toast.error("Failed to add comment", { id });
      } else {
        toast.success("Comment has been added", { id });
      }
    }
  }

  const postPath =
    useLocation().pathname.split("/").slice(0, -1).join("/") + "/";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-start gap-5">
        {comments.length ? (
          comments.map((comment: any) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        ) : (
          <p>
            <i>No comments yet</i>
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid gap-3">
          <div>
            <Label htmlFor="comment-content">Comment as the author</Label>
          </div>
          <commentAddFetcher.Form
            id="comment-add"
            action={postPath + "comments"}
            method="post"
            ref={commentAddFormRef}
            onSubmit={() => {
              const id = toast.loading("Adding comment...");
              loadingToasts.current.set("comment-add", id);
            }}
          >
            <FormErrors errors={commentAddErrors} />
            <Textarea
              placeholder="Type your comment here."
              id="comment-content"
              name="content"
              required
            />
          </commentAddFetcher.Form>
        </div>
        <Button type="submit" form="comment-add" className="self-start">
          Post comment
        </Button>
      </div>
    </div>
  );
}
