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
          <Form></Form>
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
                      <Input id="login-username" name="username" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        type="password"
                        id="login-password"
                        name="password"
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
              <Form action="/signup" method="post">
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
                      <Input id="signup-username" name="username" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        type="password"
                        id="signup-password"
                        name="password"
                      />
                    </div>
                    {/* To be continued */}
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
