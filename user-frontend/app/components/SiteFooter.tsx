import { Rss } from "lucide-react";
import { Link, useLocation } from "react-router";

type Category = {
  id: number | string;
  name: string;
  uri: string;
};

export default function SiteFooter({ categories }: { categories: Category[] }) {
  const path = useLocation().pathname;

  return (
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
          {categories.map((category) => (
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
      <div className="flex items-center gap-2">
        <p className={"text-2xl font-black" + (path === "/" ? "" : " colored")}>
          <Link to="/" viewTransition>
            Stacked Stories
          </Link>
        </p>
        <a
          href="/rss.xml"
          aria-label="RSS feed"
          title="RSS feed"
          className="text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 inline-flex size-8 items-center justify-center rounded-md transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
        >
          <Rss aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
