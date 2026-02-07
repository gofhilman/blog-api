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
          className={"text-2xl font-black" + (path === "/" ? " colored" : "")}
        >
          <Link to="/" viewTransition>
            Stacked Stories
          </Link>
        </h1>
        <div className="flex items-center gap-2">
          <span>by</span>
          <a
            href="https://github.com/gofhilman"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/hilman.jpg"
              alt="Author avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
          </a>
        </div>
      </header>
      <Outlet />
      <footer className="mt-auto flex flex-col gap-1">
        <article>
          <h3>Categories</h3>
          <ul>
            {categories.map((category: any) => (
              <li key={category.id}>
                <Link to={"/?category=" + category.uri} viewTransition>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </article>
        <p className={"text-2xl font-black" + (path === "/" ? " colored" : "")}>
          <Link to="/" viewTransition>
            Stacked Stories
          </Link>
        </p>
      </footer>
    </div>
  );
}
