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
import { useEffect, useRef, useState } from "react";
import FormErrors from "./FormErrors";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { SquarePen, Trash2 } from "lucide-react";

export default function CategoryItem({ category }: any) {
  const editFetcher = useFetcher();
  const deleteFetcher = useFetcher();
  const editFormRef = useRef<HTMLFormElement | null>(null);
  const [open, setOpen] = useState(false);
  const editErrors = editFetcher.data?.errors;
  const deleteErrors = deleteFetcher.data?.errors;
  const loadingToasts = useRef(new Map());

  useEffect(() => {
    if (editFetcher.data && !editErrors) {
      editFormRef.current?.reset();
      setOpen(false);
    }
  }, [editFetcher.data, editErrors]);

  if (editFetcher.data) {
    const id = loadingToasts.current.get("category-edit");
    if (id) {
      loadingToasts.current.delete("category-edit");
      if (editErrors) {
        toast.error("Failed to edit category", { id });
      } else {
        toast.success("Category has been edited", { id });
      }
    }
  }

  if (deleteFetcher.data) {
    const id = loadingToasts.current.get("category-delete");
    if (id) {
      loadingToasts.current.delete("category-delete");
      if (deleteErrors) {
        toast.error("Failed to delete category", { id });
      } else {
        toast.success("Category has been deleted", { id });
      }
    }
  }

  return (
    <div className="grid grid-cols-2">
      <h4 className="colored text-lg font-medium">{category.name}</h4>
      <div className="flex items-center gap-3">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <SquarePen />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit category</DialogTitle>
              <DialogDescription>
                Edit the category name here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <editFetcher.Form
              id="category-edit"
              action={"categories/" + category.uri + "/edit"}
              method="post"
              ref={editFormRef}
              onSubmit={() => {
                const id = toast.loading("Updating category...");
                loadingToasts.current.set("category-edit", id);
              }}
            >
              <FormErrors errors={editErrors} />
              <Input
                placeholder="Type the category name here."
                name="name"
                defaultValue={category.name}
                required
              />
            </editFetcher.Form>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" form="category-edit">
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash2 />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete category</DialogTitle>
              <DialogDescription>
                Please confirm you want to delete{" "}
                <strong>{category.name}</strong> category.
              </DialogDescription>
            </DialogHeader>
            <FormErrors errors={deleteErrors} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <deleteFetcher.Form
                action={"categories/" + category.uri + "/delete"}
                method="post"
                onSubmit={() => {
                  const id = toast.loading("Deleting category...");
                  loadingToasts.current.set("category-delete", id);
                }}
              >
                <Button type="submit" className="w-full" variant="destructive">
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
