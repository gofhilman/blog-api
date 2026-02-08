import { Editor } from "@tinymce/tinymce-react";
import { postImage } from "~/api/imageApi";

export default function BundledEditor(props: any) {
  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      licenseKey="gpl"
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
        skin_url: "/dark-zinc",
        content_css: "/editor-content.css",
        // skin: "dark-zinc",
        // content_css:"dark-zinc",
      }}
      {...props}
    />
  );
}
