import { Link } from "react-router";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between">
      <h1>
        <Link to="/">Stacked Stories</Link>
      </h1>
      <div className="flex items-center gap-2">
        <span>by</span>
        <a
          href="https://gofhilman.github.io/homepage/"
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
  );
}
