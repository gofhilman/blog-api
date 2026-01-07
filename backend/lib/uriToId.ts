export default function uriToId(uri: string) {
  return parseInt(
    uri.split("-")[uri.split("-").length - 1] ??
      (() => {
        throw new Error("Invalid URI format");
      })()
  );
}
