import { Dot } from "lucide-react";
import { Separator } from "./ui/separator";
import { format } from "date-fns";
import { Form, useFetcher, useSubmit } from "react-router";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useState } from "react";
import { Button } from "./ui/button";
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
import FormErrors from "./FormErrors";

function PostData({ post }: any) {
  return (
    <div>
      <h3>{post.title}</h3>
      {(post.createdAt || post.categories.length > 0) && (
        <>
          <Separator orientation="vertical" />
          <p>
            {post.createdAt && format(post.createdAt, "MMMM d, y")}
            {post.createdAt && post.categories.length > 0 && (
              <Dot className="inline" />
            )}
            {post.categories.map((category: any) => category.name).join(", ")}
          </p>
        </>
      )}
    </div>
  );
}

export default function PostItem({ post }: any) {
  const [published, setPublished] = useState(post.published);
  const submit = useSubmit();
  const fetcher = useFetcher();
  const errors = fetcher.data?.errors;

  return (
    <div>
      <PostData post={post} />
      <div>
        <div>
          <Switch
            id={"published-" + post.id}
            checked={published}
            onCheckedChange={(checked) => {
              setPublished(checked);
              submit(
                { createdAt: post.createdAt, published: checked },
                {
                  action: "posts/" + post.uri + "/published-patch",
                  method: "post",
                },
              );
            }}
          />
          <Label htmlFor={"published-" + post.id}>
            {published ? "Published" : "Unpublished"}
          </Label>
        </div>
        <Form action={"posts/" + post.uri + "/edit"}>
          <Button type="submit">Edit</Button>
        </Form>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Delete</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete post</DialogTitle>
              <DialogDescription>
                Please confirm you want to delete this post.
              </DialogDescription>
            </DialogHeader>
            <div>
              <FormErrors errors={errors} />
              <PostData post={post} />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <fetcher.Form
                action={"posts/" + post.uri + "/delete"}
                method="post"
              >
                <Button type="submit">Delete</Button>
              </fetcher.Form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
