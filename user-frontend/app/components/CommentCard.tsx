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
import { Form } from "react-router";
import { Textarea } from "./ui/textarea";

function CommentData({ comment }: any) {
  return (
    <>
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
    </>
  );
}

export default function CommentCard({ comment, user }: any) {
  return (
    <article>
      <CommentData comment={comment} />
      {(user.role === "ADMIN" || user.username === comment.user.username) && (
        <div>
          {user.username === comment.user.username && (
            <Dialog>
              <Form action={"comments/" + comment.id + "/edit"} method="post">
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
                  <Textarea
                    placeholder="Type your comment here."
                    name="content"
                    defaultValue={comment.content}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Form>
            </Dialog>
          )}
          <Dialog>
            <Form action={"comments/" + comment.id + "/delete"} method="post">
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
                <article>
                  <CommentData comment={comment} />
                </article>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Form>
          </Dialog>
        </div>
      )}
    </article>
  );
}
