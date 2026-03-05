import type { Route } from "./+types/main-layout";
import { getCategories } from "~/api/categoriesApi";
import { Link, Outlet, useLocation } from "react-router";

export async function clientLoader() {
  const { categories } = await getCategories();
  return { categories };
}

export default function MainLayout({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData;
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
          <Link
            to="https://github.com/gofhilman"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/hilman.jpg"
              alt="Author avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
          </Link>
        </div>
      </header>
      <Outlet />
      <footer className="mt-auto flex flex-col items-start gap-5">
        <article className="flex flex-col gap-1">
          <h4
            className={
              "text-xl font-extrabold" + (path === "/" ? " colored" : "")
            }
          >
            Categories
          </h4>
          <ul className={path === "/" ? "colored-container" : ""}>
            {categories.map((category: any) => (
              <li
                key={category.id}
                className={
                  "font-bold" + (path === "/" ? " colored-children" : "")
                }
              >
                <Link to={"/?category=" + category.uri} viewTransition>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </article>
        <p className={"text-2xl font-black" + (path === "/" ? "" : " colored")}>
          <Link to="/" viewTransition>
            Stacked Stories
          </Link>
        </p>
      </footer>
    </div>
  );
}
