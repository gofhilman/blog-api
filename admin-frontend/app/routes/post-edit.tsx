import { getComments, getSpecificPost, putPost } from "~/api/postsApi";
import type { Route } from "./+types/post-edit";
import {
  data,
  redirect,
  useFetcher,
  useNavigate,
  useNavigation,
} from "react-router";
import { getMe } from "~/api/authApi";
import { getCategories } from "~/api/categoriesApi";
import { useEffect, useRef, useState } from "react";
import FormErrors from "~/components/FormErrors";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { Button } from "~/components/ui/button";
import CreatableCombobox from "~/components/CreatableCombobox";
import BundledEditor from "~/components/BundledEditor";
import Comments from "~/components/Comments";
import { toast } from "sonner";
import LoadingThreeDotsPulse from "~/components/ui/LoadingThreeDotsPulse";

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  const post: any = Object.fromEntries(formData);
  if (!post.createdAt) post.createdAt = null;
  post.published = post.published === "1";
  post.categories = post.categories ? post.categories.split(", ") : [];
  try {
    return await putPost(params.postUri, post);
  } catch (error: any) {
    const errors = await error.json();
    return data({ errors }, { status: error.status });
  }
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { postUri } = params;
  const { user } = await getMe();
  if (!user || !["ADMIN", "GUEST"].includes(user.role)) {
    return redirect("/login");
  }
  const { categories } = await getCategories();
  const categoryNames = categories.map((category: any) => category.name);
  const { post } = await getSpecificPost(postUri);
  const { comments } = await getComments(postUri);
  return { categoryNames, post, comments };
}

export default function PostEdit({ loaderData, params }: Route.ComponentProps) {
  const editFetcher = useFetcher();
  const readPatchFetcher = useFetcher();
  let { categoryNames, post, comments } = loaderData;
  post = editFetcher.data?.post ?? post;
  const errors = editFetcher.data?.errors;
  const [published, setPublished] = useState(post.published);
  const editorRef = useRef<any>(null);
  const [dirty, setDirty] = useState(false);
  const loadingToast = useRef<any>(null);
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    comments
      .filter((comment: any) => !comment.read)
      .forEach((comment: any) => {
        readPatchFetcher.submit(
          {},
          {
            action:
              "/posts/" +
              params.postUri +
              "/comments/" +
              comment.id +
              "/read-patch",
            method: "post",
          },
        );
      });
  }, [params.postUri]);

  if (editFetcher.state === "idle") {
    const id = loadingToast.current;
    if (id) {
      loadingToast.current = null;
      if (errors) {
        toast.error("Failed to edit post", { id });
      } else {
        toast.success("Post has been edited", { id });
      }
    }
  }

  return (
    <main className="flex flex-col gap-10">
      <title>{`Edit ${post.title} \u2014 Stacked Control`}</title>
      {editFetcher.state !== "idle" || navigation.state !== "idle" ? (
        <LoadingThreeDotsPulse className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      ) : (
        <>
          <section>
            <editFetcher.Form
              method="post"
              onSubmit={(event: any) => {
                if (event.nativeEvent.submitter.id === "form-submit") {
                  event.preventDefault();
                  setDirty(false);
                  editorRef.current.setDirty(false);
                  const formData = new FormData(event.currentTarget);
                  formData.set("content", editorRef.current.getContent());
                  const id = toast.loading("Editing post...");
                  loadingToast.current = id;
                  editFetcher.submit(formData, { method: "post" });
                }
              }}
              className="flex flex-col gap-5"
            >
              <h2 className="text-3xl font-black">Edit {post.title}</h2>
              <FormErrors errors={errors} />
              <div className="flex flex-col gap-5">
                <Input
                  type="hidden"
                  name="createdAt"
                  value={post.createdAt ?? ""}
                />
                <div className="grid grid-cols-[1fr_2fr_1fr] items-center gap-5">
                  <div className="grid gap-1">
                    <Switch
                      id="published"
                      checked={published}
                      onCheckedChange={setPublished}
                      name="published"
                      value="1"
                    />
                    <Label htmlFor="published">
                      {published ? "Published" : "Unpublished"}
                    </Label>
                  </div>
                  <Button
                    id="form-submit"
                    type="submit"
                    className={dirty ? "colored-bg" : ""}
                  >
                    {published ? "Save and publish" : "Save"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => navigate(-1)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={post.title}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    name="subtitle"
                    defaultValue={post.subtitle}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="categories">Categories</Label>
                  <CreatableCombobox
                    id="categories"
                    name="categories"
                    categoryNames={categoryNames}
                    defaultCategories={post.categories.map(
                      (category: any) => category.name,
                    )}
                  />
                </div>
                <div className="my-5">
                  <BundledEditor
                    initialValue={post.content}
                    onInit={(evt: any, editor: any) =>
                      (editorRef.current = editor)
                    }
                    onDirty={() => setDirty(true)}
                  />
                </div>
                <div className="grid grid-cols-[1fr_2fr_1fr] items-center gap-5">
                  <div className="grid gap-1">
                    <Switch
                      id="published"
                      checked={published}
                      onCheckedChange={setPublished}
                      name="published"
                      value="1"
                    />
                    <Label htmlFor="published">
                      {published ? "Published" : "Unpublished"}
                    </Label>
                  </div>
                  <Button
                    id="form-submit"
                    type="submit"
                    className={dirty ? "colored-bg" : ""}
                  >
                    {published ? "Save and publish" : "Save"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => navigate(-1)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </editFetcher.Form>
          </section>
          <section className="flex flex-col gap-5">
            <h2 className="text-3xl font-black">Comments</h2>
            <Comments comments={comments} />
          </section>
        </>
      )}
    </main>
  );
}
