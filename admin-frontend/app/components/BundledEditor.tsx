import { Editor } from "@tinymce/tinymce-react";
// Ensure to import tinymce first as other components expect
// a global variable `tinymce` to exist
import "tinymce/tinymce";
// DOM model
import "tinymce/models/dom/model";
// Theme
import "tinymce/themes/silver";
// Toolbar icons
import "tinymce/icons/default";

// Import plugins
import "tinymce/plugins/anchor";
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/media";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/preview";
import "tinymce/plugins/help";
// Include resources that a plugin lazy-loads at the run-time
import "tinymce/plugins/help/js/i18n/keynav/en";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/table";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/codesample";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/autosave";

import wirisPlugin from "@wiris/mathtype-tinymce7/plugin.min.js?url";
import { postImage } from "~/api/imageApi";
import editorContent from "~/styles/editor-content.css?url";
import editorCodeSample from "~/styles/prism.css?url";
import "~/lib/prism.js";

export default function BundledEditor(props: any) {
  return (
    <Editor
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
        external_plugins: {
          tiny_mce_wiris: wirisPlugin,
        },
        mathTypeParameters: {
          editorParameters: {
            color: "#f4f4f5",
            backgroundColor: "#18181b",
          },
        },
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | " +
          "removeformat | help",
        draggable_modal: true,
        images_upload_handler: postImage,
        skin_url: "dark-zinc",
        content_css: [editorContent, editorCodeSample],
        codesample_global_prismjs: true,
        codesample_languages: [
          { text: "HTML/XML", value: "markup" },
          { text: "JavaScript", value: "javascript" },
          { text: "CSS", value: "css" },
          { text: "SQL", value: "sql" },
          { text: "Go", value: "go" },
          { text: "PHP", value: "php" },
          { text: "Ruby", value: "ruby" },
          { text: "Python", value: "python" },
          { text: "Java", value: "java" },
          { text: "C", value: "c" },
          { text: "C#", value: "csharp" },
          { text: "C++", value: "cpp" },
          { text: "Bash", value: "bash" },
          { text: "YAML", value: "yaml" },
          { text: "Docker", value: "docker" },
        ],
        convert_urls: false,
        extended_valid_elements: "iframe[*],div[*],a[*]",
        sandbox_iframes: false,
        convert_unsafe_embeds: false,
        valid_children: "+body[style]",
        valid_elements: "#p",
      }}
      {...props}
    />
  );
}
