import { use } from "react";
import CommentCard from "./CommentCard";
import { useFetcher } from "react-router";
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
import FetcherErrors from "./FetcherErrors";

export default function Comments({ commentsAndUser }: any) {
  const [{ comments }, { user }]: any = use(commentsAndUser);
  const loginFetcher = useFetcher();
  const signupFetcher = useFetcher();
  const commentAddFetcher = useFetcher();
  const logoutFetcher = useFetcher();
  const loginErrors = loginFetcher.data?.errors;
  const signupErrors = signupFetcher.data?.errors;
  const commentAddErrors = commentAddFetcher.data?.errors;

  return (
    <div>
      <div>
        {comments.length ? (
          comments.map((comment: any) => (
            <CommentCard key={comment.id} comment={comment} user={user} />
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
      <div>
        {user ? (
          <div>
            <div className="grid gap-3">
              <div>
                <Label htmlFor="comment-content">
                  Comment as {user.username}
                </Label>
                <logoutFetcher.Form action="/logout" method="post">
                  <Button type="submit">Log out</Button>
                </logoutFetcher.Form>
              </div>
              <commentAddFetcher.Form
                id="comment-add"
                action="comments"
                method="post"
              >
                <FetcherErrors errors={commentAddErrors} />
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
        ) : (
          <div>
            <Dialog>
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
                <loginFetcher.Form id="login" action="/login" method="post">
                  <FetcherErrors errors={loginErrors} />
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
                </loginFetcher.Form>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" form="login">
                    Log in
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            or
            <Dialog>
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
                <signupFetcher.Form
                  id="signup"
                  action="/signup"
                  method="post"
                  onSubmit={(event) => {
                    const form = event.currentTarget;
                    const password =
                      form.querySelector<HTMLInputElement>("#signup-password");
                    const confirmPassword =
                      form.querySelector<HTMLInputElement>(
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
                  <FetcherErrors errors={signupErrors} />
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
                </signupFetcher.Form>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" form="signup">
                    Sign up
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            to comment
          </div>
        )}
      </div>
    </div>
  );
}
