import { Info, Rss } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";

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
      <div className="flex items-baseline gap-4">
        <p className={"text-2xl font-black" + (path === "/" ? "" : " colored")}>
          <Link to="/" viewTransition>
            Stacked Stories
          </Link>
        </p>
        <div className="flex items-center gap-0.5">
          <a href="/rss.xml">
            <Button variant="outline" size="sm" className="font-semibold">
              <Rss /> RSS
            </Button>
          </a>
          <Link to="/how-to-subscribe-to-an-rss-feed-16" viewTransition>
            <Button variant="ghost" size="sm">
              <Info />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
