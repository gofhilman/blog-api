import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/main-layout.tsx", [
    index("routes/home.tsx"),
    route(":postUri", "routes/post.tsx"),
    route(":postUri/comments", "routes/comment-add.tsx"),
    route(":postUri/comments/:commentId", "routes/comment-edit.tsx"),
    route(":postUri/comments/:commentId", "routes/comment-delete.tsx"),
  ]),
] satisfies RouteConfig;
