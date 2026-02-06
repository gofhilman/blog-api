import { Link, Outlet, useFetcher } from "react-router";
import { Button } from "~/components/ui/button";

export default function MainLayout() {
  const fetcher = useFetcher();

  return (
    <div className="flex min-h-screen flex-col gap-10 px-5 py-12">
      <header className="flex items-center justify-between">
        <h1 className="colored text-2xl font-black">
          <Link to="/" viewTransition>
            Stacked Control
          </Link>
        </h1>
        <fetcher.Form action="/logout" method="post">
          <Button type="submit" variant="outline">
            Log out
          </Button>
        </fetcher.Form>
      </header>
      <Outlet />
      <footer className="mt-auto flex flex-col gap-1">
        <h4 className="colored text-2xl font-black">
          <Link to="/" viewTransition>
            Stacked Control
          </Link>
        </h4>
        <p>
          The admin dashboard for <a href="/">Stacked Stories</a>
        </p>
      </footer>
    </div>
  );
}
