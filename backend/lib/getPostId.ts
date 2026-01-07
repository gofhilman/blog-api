export default function getPostId(postUri: string) {
  return parseInt(
    postUri.split("-")[postUri.split("-").length - 1] ??
      (() => {
        throw new Error("Invalid post URI format");
      })()
  );
}
