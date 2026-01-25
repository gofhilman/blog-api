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
import FetcherErrors from "./FetcherErrors";
import { Input } from "./ui/input";

export default function CategoryItem({ category }: any) {
  const editFetcher = useFetcher();
  const deleteFetcher = useFetcher();
  const editFormRef = useRef<HTMLFormElement | null>(null);
  const [open, setOpen] = useState(false);
  const editErrors = editFetcher.data?.errors;
  const deleteErrors = deleteFetcher.data?.errors;

  useEffect(() => {
    if (editFetcher.state === "idle" && !editErrors) {
      editFormRef.current?.reset();
      setOpen(false);
    }
  }, [editFetcher.state, editErrors]);

  return (
    <div>
      <h4>{category.title}</h4>
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit</Button>
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
            >
              <FetcherErrors errors={editErrors} />
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
            <Button variant="outline">Delete</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete category</DialogTitle>
              <DialogDescription>
                Please confirm you want to delete{" "}
                <strong>{category.name}</strong> category.
              </DialogDescription>
            </DialogHeader>
            <FetcherErrors errors={deleteErrors} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <deleteFetcher.Form
                action={"categories/" + category.uri + "/delete"}
                method="post"
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
