import { Link } from "react-router";

export default function Footer() {
  return (
    <footer>
      <h4>
        <Link to="/">Stacked Stories Control</Link>
      </h4>
      <p>
        An admin dashboard for <a href="/">Stacked Stories</a>
      </p>
    </footer>
  );
}
