import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/main-layout.tsx", [
    index("routes/home.tsx"),
    ...prefix(":postUri", [
      index("routes/post.tsx"),
      route("login", "routes/login.tsx"),
      route("logout", "routes/logout.tsx"),
      route("signup", "routes/signup.tsx"),
      ...prefix("comments", [
        index("routes/comment-add.tsx"),
        route(":commentId/edit", "routes/comment-edit.tsx"),
        route(":commentId/delete", "routes/comment-delete.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
