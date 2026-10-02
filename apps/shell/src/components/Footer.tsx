export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-portal-green/30 bg-portal-dark/70 px-4 py-3 text-center text-xs text-white/50 backdrop-blur-sm">
      © {year} Cecilia Silva
    </footer>
  );
}
