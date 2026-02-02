import { Dot } from "lucide-react";
import { Separator } from "./ui/separator";
import { format } from "date-fns";
import { Form, useFetcher } from "react-router";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useRef, useState } from "react";
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
import { toast } from "sonner";

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
  const publishedFetcher = useFetcher();
  const deleteFetcher = useFetcher();
  const errors = deleteFetcher.data?.errors;
  const loadingToasts = useRef(new Map());

  if (publishedFetcher.data) {
    const id = loadingToasts.current.get("post-patch");
    if (id) {
      loadingToasts.current.delete("post-patch");
      if (publishedFetcher.data.errors) {
        toast.error(`Failed to ${published ? "publish" : "unpublish"} post`, {
          id,
        });
      } else {
        toast.success(
          `Post has been ${published ? "published" : "unpublished"}`,
          {
            id,
          },
        );
      }
    }
  }

  if (deleteFetcher.data) {
    const id = loadingToasts.current.get("post-delete");
    if (id) {
      loadingToasts.current.delete("post-delete");
      if (errors) {
        toast.error("Failed to delete post", { id });
      } else {
        toast.success("Post has been deleted", { id });
      }
    }
  }

  return (
    <div>
      <PostData post={post} />
      <div>
        <div>
          <Switch
            id={"published-" + post.id}
            checked={published}
            onCheckedChange={(checked: any) => {
              setPublished(checked);
              const id = toast.loading(
                `${published ? "Publishing" : "Unpublishing"} post...`,
              );
              loadingToasts.current.set("post-patch", id);
              publishedFetcher.submit(
                {
                  createdAt: post.createdAt ?? "",
                  published: checked ? "1" : "",
                },
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
              <deleteFetcher.Form
                action={"posts/" + post.uri + "/delete"}
                method="post"
                onSubmit={() => {
                  const id = toast.loading("Deleting post...");
                  loadingToasts.current.set("post-delete", id);
                }}
              >
                <Button type="submit">Delete</Button>
              </deleteFetcher.Form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
