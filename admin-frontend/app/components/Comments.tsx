import { useEffect, useRef } from "react";
import CommentCard from "./CommentCard";
import { useFetcher, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import FormErrors from "./FormErrors";

export default function Comments({ comments }: any) {
  const commentAddFetcher = useFetcher();
  const commentAddFormRef = useRef<HTMLFormElement | null>(null);
  const commentAddErrors = commentAddFetcher.data?.errors;

  useEffect(() => {
    if (commentAddFetcher.state === "idle" && !commentAddErrors) {
      commentAddFormRef.current?.reset();
    }
  }, [commentAddFetcher.state, commentAddErrors]);
  
  const postPath =
    useLocation().pathname.split("/").slice(0, -1).join("/") + "/";

  return (
    <div>
      <div>
        {comments.length ? (
          comments.map((comment: any) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
      <div>
        <div>
          <div className="grid gap-3">
            <div>
              <Label htmlFor="comment-content">Comment as the author</Label>
            </div>
            <commentAddFetcher.Form
              id="comment-add"
              action={postPath+"comments"}
              method="post"
              ref={commentAddFormRef}
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
          <Button type="submit" form="comment-add">
            Post comment
          </Button>
        </div>
      </div>
    </div>
  );
}
