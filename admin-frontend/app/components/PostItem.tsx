import { Dot } from "lucide-react";
import { Separator } from "./ui/separator";
import { format } from "date-fns";
import { Form, useSubmit } from "react-router";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useState } from "react";

export default function PostItem({ post }: any) {
  const [published, setPublished] = useState(post.published);
  const submit = useSubmit();

  return (
    <div>
      <div>
        <h3>{post.title}</h3>
        {(post.createdAt || post.categories.length > 0) && (
          <>
            <Separator orientation="vertical" />
            <p>
              {post.createdAt && format(post.createdAt, "MMMM d, y")}
              {post.createdAt &&
                post.categories.length > 0 &&
                " " + <Dot /> + " "}
              {post.categories.join(", ")}
            </p>
          </>
        )}
      </div>
      <div>
        <div>
          <Switch
            id={"published-" + post.id}
            checked={published}
            onCheckedChange={(checked) => {
              setPublished(checked);
              submit(
                { published: checked },
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
      </div>
      <Form>
        
      </Form>
    </div>
  );
}
