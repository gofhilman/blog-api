import { Form, redirect } from "react-router";
import type { Route } from "./+types/post-add";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { useState } from "react";
import { getMe } from "~/api/authApi";
import { getCategories } from "~/api/categoriesApi";
import CreatableCombobox from "~/components/CreatableCombobox";
import BundledEditor from "~/components/BundledEditor";
import { postImage } from "~/api/imageApi";
import { Button } from "~/components/ui/button";

export async function clientLoader() {
  const { user } = await getMe();
  if (!user) return redirect("login");
  const { categories } = await getCategories();
  const categoryNames = categories.map((category: any) => category.name);
  return { categoryNames };
}

export default function PostAdd({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [published, setPublished] = useState(true);

  return (
    <main>
      <title>Create New Post &mdash; Stacked Stories</title>
      <Form method="post">
        <h2>Create New Post</h2>
        <div>
          <div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required />
            </div>
            <div>
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
            <Button type="submit">
              {published ? "Save and publish" : "Save"}
            </Button>
          </div>
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input id="subtitle" name="subtitle" required />
          </div>
          <div>
            <Label htmlFor="categories">Categories</Label>
            <CreatableCombobox
              id="categories"
              name="categories"
              categoryNames={loaderData.categoryNames}
            />
          </div>
          <BundledEditor
            name="content"
            init={{
              placeholder: "Compose your thoughts here.",
              height: 500,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "help",
                "wordcount",
                "codesample",
                "autoresize",
                "autosave",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor codesample | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              images_upload_handler: postImage,
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
      </Form>
    </main>
  );
}
