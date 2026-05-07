import type { Config } from "@react-router/dev/config";
import { getPublishedPosts } from "./app/api/postsApi";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  async prerender() {
    const { posts } = await getPublishedPosts();
    return ["/", "/rss.xml", ...posts.map((post: any) => `/${post.uri}`)];
  },
} satisfies Config;
