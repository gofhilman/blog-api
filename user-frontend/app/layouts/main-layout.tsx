import type { Route } from "./+types/main-layout";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
}

export default function MainLayout({ loaderData }: Route.ComponentProps) {}
