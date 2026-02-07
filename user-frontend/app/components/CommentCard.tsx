import { Dot, SquarePen, Trash2 } from "lucide-react";
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
import { Separator } from "./ui/separator";
import { toast } from "sonner";

function CommentData({ comment }: any) {
  return (
    <>
      <div className="flex">
        <p className="text-sm font-bold">
          {comment.user.username}
          {comment.user.role === "ADMIN" && <span> (Author)</span>}
        </p>
        <Dot />
        <p className="text-sm font-bold">
          {comment.updatedAt
            ? formatTime(comment.updatedAt) + " (edited)"
            : formatTime(comment.createdAt)}
        </p>
      </div>
      <Separator />
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
  const loadingToasts = useRef(new Map());

  useEffect(() => {
    if (commentEditFetcher.data && !commentEditErrors) {
      commentEditFormRef.current?.reset();
      setOpen(false);
    }
  }, [commentEditFetcher.data, commentEditErrors]);

  if (commentEditFetcher.data) {
    const id = loadingToasts.current.get("comment-edit");
    if (id) {
      loadingToasts.current.delete("comment-edit");
      if (commentEditErrors) {
        toast.error("Failed to edit comment", { id });
      } else {
        toast.success("Comment has been edited", { id });
      }
    }
  }

  if (commentDeleteFetcher.data) {
    const id = loadingToasts.current.get("comment-delete");
    if (id) {
      loadingToasts.current.delete("comment-delete");
      if (commentDeleteErrors) {
        toast.error("Failed to delete comment", { id });
      } else {
        toast.success("Comment has been deleted", { id });
      }
    }
  }

  return (
    <article className="flex flex-col items-start gap-2">
      <div className="flex flex-col gap-0.5">
        <CommentData comment={comment} />
      </div>
      {(user.role === "ADMIN" || user.username === comment.user.username) && (
        <div className="flex items-center gap-3">
          {user.username === comment.user.username && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon-sm">
                  <SquarePen />
                </Button>
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
                  onSubmit={() => {
                    const id = toast.loading("Editing comment...");
                    loadingToasts.current.set("comment-edit", id);
                  }}
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
              <Button variant="destructive" size="icon-sm">
                <Trash2 />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete comment</DialogTitle>
                <DialogDescription>
                  Please confirm you want to delete this comment.
                </DialogDescription>
              </DialogHeader>
              <div className="justify-self-start">
                <FetcherErrors errors={commentDeleteErrors} />
                <article className="flex flex-col gap-0.5">
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
                  onSubmit={() => {
                    const id = toast.loading("Deleting comment...");
                    loadingToasts.current.set("comment-delete", id);
                  }}
                >
                  <Button
                    type="submit"
                    className="w-full"
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </commentDeleteFetcher.Form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </article>
  );
}
