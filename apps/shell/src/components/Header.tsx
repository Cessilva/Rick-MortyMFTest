import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-portal-green/30 bg-portal-dark/70 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <Link
          to="/"
          className="text-2xl font-bold text-portal-green hover:text-portal-blue sm:text-3xl"
        >
          Rick &amp; Morty
        </Link>
      </div>
    </header>
  );
}
