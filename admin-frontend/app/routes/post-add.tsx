import { Form } from "react-router";
import type { Route } from "./+types/post-add";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { useState } from "react";

export default function PostAdd({ actionData }: Route.ComponentProps) {
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
              />
              <Label htmlFor="published">
                {published ? "Published" : "Unpublished"}
              </Label>
            </div>
          </div>
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input id="subtitle" name="subtitle" required />
          </div>
          
          <Input type="hidden" name="published" value={published ? "1" : ""} />
        </div>
      </Form>
    </main>
  );
}
