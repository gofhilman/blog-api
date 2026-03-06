import { useRef } from "react";
import { Form, Link, Outlet, useLocation, useSubmit } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

export default function MainLayout() {
  const path = useLocation().pathname;
  const loadingToast = useRef<any>(null);
  const submit = useSubmit();

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-10 px-5 py-12">
      <header className="flex items-center justify-between">
        <h1
          className={"text-2xl font-black" + (path === "/" ? "" : " colored")}
        >
          <Link to="/" viewTransition>
            Stacked Control
          </Link>
        </h1>
        <Form
          action="/logout"
          method="post"
          onSubmit={(event) => {
            event.preventDefault();
            const id = toast.loading("Logging out...");
            loadingToast.current = id;
            const formData: any = new FormData(event.currentTarget);
            formData.set("toastId", id);
            submit(formData, { action: "/logout", method: "post" });
          }}
        >
          <Button type="submit" variant="outline">
            Log out
          </Button>
        </Form>
      </header>
      <Outlet />
      <footer className="mt-auto flex flex-col items-start gap-1">
        <h4
          className={"text-2xl font-black" + (path === "/" ? "" : " colored")}
        >
          <Link to="/" viewTransition>
            Stacked Control
          </Link>
        </h4>
        <p>
          The admin dashboard for{" "}
          <Link
            to={import.meta.env.VITE_BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Stacked Stories
          </Link>
        </p>
      </footer>
    </div>
  );
}
