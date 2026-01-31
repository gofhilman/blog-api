import { Dot } from "lucide-react";
import formatTime from "~/lib/formatTime";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useFetcher } from "react-router";
import { Textarea } from "./ui/textarea";
import FetcherErrors from "./FetcherErrors";
import { useEffect, useRef, useState } from "react";

function CommentData({ comment }: any) {
  return (
    <>
      <div>
        <p>
          {comment.user.username}
          {comment.user.role === "ADMIN" && <span> (Author)</span>}
        </p>
        <Dot />
        <p>
          {comment.updatedAt
            ? formatTime(comment.updatedAt) + " (edited)"
            : formatTime(comment.createdAt)}
        </p>
      </div>
      <p>{comment.content}</p>
    </>
  );
}

export default function CommentCard({ comment, user }: any) {
  const commentEditFetcher = useFetcher();
  const commentDeleteFetcher = useFetcher();
  const commentEditFormRef = useRef<HTMLFormElement | null>(null);
  const [open, setOpen] = useState(false);
  const commentEditErrors = commentEditFetcher.data?.errors;
  const commentDeleteErrors = commentDeleteFetcher.data?.errors;

  useEffect(() => {
    if (commentEditFetcher.state === "idle" && !commentEditErrors) {
      commentEditFormRef.current?.reset();
      setOpen(false);
    }
  }, [commentEditFetcher.state, commentEditErrors]);

  return (
    <article>
      <CommentData comment={comment} />
      {(user.role === "ADMIN" || user.username === comment.user.username) && (
        <div>
          {user.username === comment.user.username && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit comment</DialogTitle>
                  <DialogDescription>
                    Edit your comment here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <commentEditFetcher.Form
                  id="comment-edit"
                  action={"comments/" + comment.id + "/edit"}
                  method="post"
                  ref={commentEditFormRef}
                >
                  <FetcherErrors errors={commentEditErrors} />
                  <Textarea
                    placeholder="Type your comment here."
                    name="content"
                    defaultValue={comment.content}
                    required
                  />
                </commentEditFetcher.Form>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" form="comment-edit">
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete comment</DialogTitle>
                <DialogDescription>
                  Please confirm you want to delete this comment.
                </DialogDescription>
              </DialogHeader>
              <div>
                <FetcherErrors errors={commentDeleteErrors} />
                <article>
                  <CommentData comment={comment} />
                </article>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <commentDeleteFetcher.Form
                  action={"comments/" + comment.id + "/delete"}
                  method="post"
                >
                  <Button type="submit">Delete</Button>
                </commentDeleteFetcher.Form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </article>
  );
}
