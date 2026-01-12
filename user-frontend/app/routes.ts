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
  ]),
] satisfies RouteConfig;
