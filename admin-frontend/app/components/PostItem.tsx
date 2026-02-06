import { format } from "date-fns";
import { Form, useFetcher } from "react-router";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useEffect, useRef, useState } from "react";
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
import { SquarePen, Trash2 } from "lucide-react";

function PostData({ post }: any) {
  return (
    <div>
      <h3 className="text-lg font-medium">{post.title}</h3>
      <p className="text-secondary-foreground text-sm">
        {post.createdAt && format(post.createdAt, "MMMM d, y")}
      </p>
      <p className="font-medium">
        {post.categories.map((category: any) => category.name).join(", ")}
      </p>
    </div>
  );
}

export default function PostItem({ post }: any) {
  const [published, setPublished] = useState(post.published);
  const publishedFetcher = useFetcher();
  const deleteFetcher = useFetcher();
  const publishedErrors = publishedFetcher.data?.errors;
  const deleteErrors = deleteFetcher.data?.errors;
  const loadingToasts = useRef(new Map());

  useEffect(() => {
    if (publishedErrors) {
      setPublished(post.published);
    }
  }, [publishedErrors]);

  if (publishedFetcher.data) {
    const id = loadingToasts.current.get("post-patch");
    if (id) {
      loadingToasts.current.delete("post-patch");
      if (publishedErrors) {
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
      if (deleteErrors) {
        toast.error("Failed to delete post", { id });
      } else {
        toast.success("Post has been deleted", { id });
      }
    }
  }

  return (
    <div className="grid grid-cols-[auto_180px] gap-3">
      <PostData post={post} />
      <div className="grid grid-cols-[85px_1fr_1fr] place-items-center gap-2">
        <div className="justify-self-start">
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
        <Form action={"posts/" + post.uri + "/edit"} viewTransition>
          <Button type="submit" variant="outline" size="icon">
            <SquarePen />
          </Button>
        </Form>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash2 />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete post</DialogTitle>
              <DialogDescription>
                Please confirm you want to delete this post.
              </DialogDescription>
            </DialogHeader>
            <div>
              <FormErrors errors={deleteErrors} />
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
                <Button className="w-full" variant="destructive" type="submit">
                  Delete
                </Button>
              </deleteFetcher.Form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
