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
    ...prefix("posts", [
      index("routes/post-add.tsx"),
      route(":postUri/edit", "routes/post-edit.tsx"),
      route(":postUri/published-patch", "routes/post-published-patch.tsx"),
      route(":postUri/delete", "routes/post-delete.tsx"),
      ...prefix(":postUri/comments", [
        index("routes/comment-add.tsx"),
        route(":commentId/edit", "routes/comment-edit.tsx"),
        route(":commentId/delete", "routes/comment-delete.tsx"),
      ]),
    ]),
    route("categories/:categoryUri/edit", "routes/category-edit.tsx"),
    route("categories/:categoryUri/delete", "routes/category-delete.tsx"),
  ]),
  layout("layouts/auth-layout.tsx", [
    route("login", "routes/login.tsx"),
    route("logout", "routes/logout.tsx"),
    route("signup", "routes/signup.tsx"),
  ]),
] satisfies RouteConfig;
