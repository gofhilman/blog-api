import type { Config } from "@react-router/dev/config";
import { getAllPosts } from "./app/api/postsApi";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  async prerender() {
    const { posts } = await getAllPosts();
    return ["/", ...posts.map((post: any) => `/${post.uri}`)];
  },
} satisfies Config;
