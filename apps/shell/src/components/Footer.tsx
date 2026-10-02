export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="px-4 py-3 text-center text-xs text-white/50">
      © {year} Cecilia Silva
    </footer>
  );
}
