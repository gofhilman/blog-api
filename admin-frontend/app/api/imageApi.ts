const imageUploadUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

export async function postImage(blobInfo: any) {
  const formData = new FormData();
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UNSIGNED_UPLOAD_PRESET,
  );
  formData.append("tags", "browser_upload");
  formData.append("file", blobInfo.blob(), blobInfo.filename());

  const response = await fetch(imageUploadUrl, {
    method: "POST",
    body: formData,
  });
  if (response.status === 403)
    throw { message: "HTTP Error: " + response.status, remove: true };
  if (!response.ok) throw "HTTP Error: " + response.status;
  const json = await response.json();
  if (!json || typeof json.secure_url !== "string")
    throw "Invalid JSON: " + JSON.stringify(json);

  return json.secure_url;
}
