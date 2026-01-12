import { Link } from "react-router";

export default function Footer({ categories }: any) {
  return (
    <footer>
      <article>
        <h3>Categories</h3>
        <ul>
          {categories.map((category: any) => (
            <li key={category.id}>
              <Link to={"/?category=" + category.uri}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </article>
      <p>
        <Link to="/">Stacked Stories</Link>
      </p>
    </footer>
  );
}
