import { Link, Outlet, useLocation } from "react-router";

export default function MainLayout() {
  const path = useLocation().pathname;

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-10 px-5 py-12">
      <header className="flex w-full items-center justify-between">
        <h1
          className={"text-2xl font-black" + (path === "/" ? "" : " colored")}
        >
          <Link to="/" viewTransition>
            Stacked Stories
          </Link>
        </h1>
        <div className="flex items-center gap-2">
          <span>by</span>
          <Link to="https://gofhilman.my.id/">
            <img
              src="/hilman.jpg"
              alt="Author avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
          </Link>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
