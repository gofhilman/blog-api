import { format } from "date-fns";
import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div>
      <header>
        <h1>
          <Link to="/" viewTransition>
            Stacked Control
          </Link>
        </h1>
      </header>
      <p>Welcome to Stacked Stories Admin Dashboard.</p>
      <Outlet />
      <footer>
        <p>
          &copy; {format(new Date(), "y")} Stacked Stories. All right reserved.
        </p>
      </footer>
    </div>
  );
}
