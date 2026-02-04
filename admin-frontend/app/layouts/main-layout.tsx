import { Link, Outlet, useFetcher } from "react-router";
import { Button } from "~/components/ui/button";

export default function MainLayout() {
  const fetcher = useFetcher();

  return (
    <div className="flex min-h-screen flex-col px-5 py-12">
      <header>
        <h1>
          <Link to="/" viewTransition>
            Stacked Control
          </Link>
        </h1>
        <fetcher.Form action="/logout" method="post">
          <Button type="submit">Log out</Button>
        </fetcher.Form>
      </header>
      <Outlet />
      <footer>
        <h4>
          <Link to="/" viewTransition>
            Stacked Control
          </Link>
        </h4>
        <p>
          An admin dashboard for <a href="/">Stacked Stories</a>
        </p>
      </footer>
    </div>
  );
}
