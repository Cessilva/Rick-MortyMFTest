import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-white/10 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <Link
          to="/"
          className="text-lg font-bold text-portal-green hover:text-portal-blue"
        >
          Rick &amp; Morty
        </Link>
      </div>
    </header>
  );
}
