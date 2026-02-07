import { format } from "date-fns";
import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-10 px-5 py-12">
      <header>
        <h1 className="text-2xl font-black">
          <Link to="/" viewTransition>
            Stacked Control
          </Link>
        </h1>
      </header>
      <p className="colored text-3xl font-bold">
        Welcome to Stacked Stories Admin Dashboard.
      </p>
      <Outlet />
      <footer className="mt-auto">
        <p>
          &copy; {format(new Date(), "y")} Stacked Stories. All right reserved.
        </p>
      </footer>
    </div>
  );
}
