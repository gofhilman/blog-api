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
    route(":postUri/comments/:commentId/edit", "routes/comment-edit.tsx"),
    route(":postUri/comments/:commentId/delete", "routes/comment-delete.tsx"),
    route(":postUri/login", "routes/login.tsx"),
    route(":postUri/logout", "routes/logout.tsx"),
    route(":postUri/signup", "routes/signup.tsx"),
  ]),
] satisfies RouteConfig;
