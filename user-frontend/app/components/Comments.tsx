import { use } from "react";
import CommentCard from "./CommentCard";
import { Form } from "react-router";
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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function Comments({ commentsAndUser }: any) {
  const [comments, user]: any = use(commentsAndUser);
  return (
    <div>
      <div>
        {comments.map((comment: any) => (
          <CommentCard key={comment.id} comment={comment} user={user} />
        ))}
      </div>
      <div>
        {user ? (
          <Form action="comments" method="post">
            <div className="grid gap-3">
              <Label htmlFor="comment-content">Leave a comment</Label>
              <Textarea
                placeholder="Type your comment here."
                id="comment-content"
                name="content"
                required
              />
            </div>
            <Button>Post comment</Button>
          </Form>
        ) : (
          <div>
            <Dialog>
              <Form action="/login" method="post">
                <DialogTrigger asChild>
                  <Button variant="outline">Log in</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Log in</DialogTitle>
                    <DialogDescription>
                      Enter your credentials to access your account.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="login-username">Username</Label>
                      <Input id="login-username" name="username" required />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        type="password"
                        id="login-password"
                        name="password"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Log in</Button>
                  </DialogFooter>
                </DialogContent>
              </Form>
            </Dialog>
            or
            <Dialog>
              <Form
                action="/signup"
                method="post"
                onSubmit={(event) => {
                  const form = event.currentTarget;
                  const password =
                    form.querySelector<HTMLInputElement>("#signup-password");
                  const confirmPassword = form.querySelector<HTMLInputElement>(
                    "#signup-confirm-password",
                  );
                  if (confirmPassword) {
                    confirmPassword.setCustomValidity("");
                    if (confirmPassword.value !== password?.value) {
                      confirmPassword.setCustomValidity(
                        "Passwords must match, darling.",
                      );
                    }
                  }
                  if (!form.reportValidity()) {
                    event.preventDefault();
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">Sign up</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Sign up</DialogTitle>
                    <DialogDescription>
                      Sign up to join the discussion.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="signup-username">Username</Label>
                      <Input id="signup-username" name="username" required />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        type="password"
                        id="signup-password"
                        name="password"
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="signup-confirm-password">
                        Confirm password
                      </Label>
                      <Input
                        type="password"
                        id="signup-confirm-password"
                        name="confirm-password"
                        required
                      />
                    </div>
                    <Input type="hidden" name="role" value="USER" />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Sign up</Button>
                  </DialogFooter>
                </DialogContent>
              </Form>
            </Dialog>
            to comment
          </div>
        )}
      </div>
    </div>
  );
}
