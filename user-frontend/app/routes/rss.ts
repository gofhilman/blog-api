import { getPublishedPosts } from "~/api/postsApi";
import type { Route } from "./+types/rss";

const SITE_TITLE = "Stacked Stories";
const SITE_DESCRIPTION = "A blog by Hilman Fikry";

function escapeXml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getBlogRootUrl(request: Request) {
  const configuredUrl = import.meta.env.VITE_BLOG_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, "");
  }

  return new URL(request.url).origin;
}

function toRssDate(value: string) {
  return new Date(value).toUTCString();
}

export async function loader({ request }: Route.LoaderArgs) {
  const { posts } = await getPublishedPosts();
  const blogRootUrl = getBlogRootUrl(request);
  const publishedPosts = posts.filter(
    (post: any) => post.published && post.createdAt && post.uri,
  );
  const lastBuildDate = publishedPosts[0]?.createdAt
    ? toRssDate(publishedPosts[0].createdAt)
    : new Date().toUTCString();

  const items = publishedPosts
    .map((post: any) => {
      const postUrl = `${blogRootUrl}/${post.uri}`;
      const categories = Array.isArray(post.categories)
        ? post.categories
            .map(
              (category: any) =>
                `      <category>${escapeXml(category.name)}</category>`,
            )
            .join("\n")
        : "";

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <pubDate>${escapeXml(toRssDate(post.createdAt))}</pubDate>
      <description>${escapeXml(post.subtitle)}</description>${categories ? `\n${categories}` : ""}
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${escapeXml(blogRootUrl)}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
