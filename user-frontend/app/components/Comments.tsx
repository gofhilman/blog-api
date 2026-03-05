import { use, useEffect, useRef } from "react";
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
import { toast } from "sonner";
import { Item, ItemContent, ItemTitle } from "./ui/item";

export default function Comments({ commentsAndUser }: any) {
  const [{ comments }, { user }]: any = use(commentsAndUser);
  const loginFetcher = useFetcher();
  const signupFetcher = useFetcher();
  const commentAddFetcher = useFetcher();
  const logoutFetcher = useFetcher();
  const commentAddFormRef = useRef<HTMLFormElement | null>(null);
  const loginErrors = loginFetcher.data?.errors;
  const signupErrors = signupFetcher.data?.errors;
  const commentAddErrors = commentAddFetcher.data?.errors;
  const loadingToasts = useRef(new Map());

  useEffect(() => {
    if (commentAddFetcher.data && !commentAddErrors) {
      commentAddFormRef.current?.reset();
    }
  }, [commentAddFetcher.data, commentAddErrors]);

  if (loginFetcher.state === "idle") {
    const id = loadingToasts.current.get("login");
    if (id) {
      loadingToasts.current.delete("login");
      if (loginErrors) {
        toast.error("Failed to log in", { id });
      } else {
        toast.success("You're now logged in", { id });
      }
    }
  }

  if (logoutFetcher.state === "idle") {
    const id = loadingToasts.current.get("logout");
    if (id) {
      loadingToasts.current.delete("logout");
      toast.success("You're now logged out", { id });
    }
  }

  if (signupFetcher.state === "idle") {
    const id = loadingToasts.current.get("signup");
    if (id) {
      loadingToasts.current.delete("signup");
      if (signupErrors) {
        toast.error("Failed to sign up", { id });
      } else {
        toast.success("Account created successfully", { id });
      }
    }
  }

  if (commentAddFetcher.state === "idle") {
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

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-start gap-5">
        {comments.length ? (
          comments.map((comment: any) => (
            <CommentCard key={comment.id} comment={comment} user={user} />
          ))
        ) : (
          <p>
            <i>No comments yet</i>
          </p>
        )}
      </div>
      <div>
        {user ? (
          <div className="flex flex-col gap-3">
            <div className="grid gap-3">
              <div className="flex items-center gap-4">
                <Label htmlFor="comment-content" className="text-lg">
                  Comment as {user.username}
                </Label>
                <logoutFetcher.Form
                  action="/logout"
                  method="post"
                  onSubmit={() => {
                    const id = toast.loading("Logging out...");
                    loadingToasts.current.set("logout", id);
                  }}
                >
                  <Button type="submit" variant="outline" size="sm">
                    Log out
                  </Button>
                </logoutFetcher.Form>
              </div>
              <commentAddFetcher.Form
                id="comment-add"
                action="comments"
                method="post"
                ref={commentAddFormRef}
                onSubmit={() => {
                  const id = toast.loading("Adding comment...");
                  loadingToasts.current.set("comment-add", id);
                }}
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
            <Button type="submit" form="comment-add" className="self-start">
              Post comment
            </Button>
          </div>
        ) : (
          <Item variant="outline">
            <ItemContent className="items-center">
              <ItemTitle>
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
                    <loginFetcher.Form
                      id="login"
                      action="/login"
                      method="post"
                      onSubmit={() => {
                        const id = toast.loading("Logging in...");
                        loadingToasts.current.set("login", id);
                      }}
                    >
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
                          form.querySelector<HTMLInputElement>(
                            "#signup-password",
                          );
                        const confirmPassword =
                          form.querySelector<HTMLInputElement>(
                            "#signup-confirm-password",
                          );
                        if (confirmPassword) {
                          if (confirmPassword.value !== password?.value) {
                            confirmPassword.setCustomValidity(
                              "Passwords must match, darling.",
                            );
                          }
                        }
                        if (!form.reportValidity()) {
                          return event.preventDefault();
                        }
                        const id = toast.loading("Signing you up...");
                        loadingToasts.current.set("signup", id);
                      }}
                    >
                      <FetcherErrors errors={signupErrors} />
                      <div className="grid gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="signup-username">Username</Label>
                          <Input
                            id="signup-username"
                            name="username"
                            required
                          />
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
                            onChange={(event) =>
                              event.target.setCustomValidity("")
                            }
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
              </ItemTitle>
            </ItemContent>
          </Item>
        )}
      </div>
    </div>
  );
}
