import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function CharactersPlaceholder() {
  return (
    <div className="text-center text-white/70">
      <p className="text-lg">Microfrontend de personajes.</p>
      <p className="text-sm text-white/40">(remote: characters @ :3001)</p>
    </div>
  );
}

function CharacterDetailPlaceholder() {
  const { id } = useParams();
  return (
    <div className="text-center text-white/70">
      <p className="text-lg">Microfrontend de detalle del personaje {id}.</p>
      <p className="text-sm text-white/40">(remote: characterDetail @ :3002)</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="space-bg flex min-h-full flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-10">
        <Routes>
          <Route path="/" element={<Navigate to="/characters" replace />} />
          <Route path="/characters" element={<CharactersPlaceholder />} />
          <Route
            path="/character-detail/:id"
            element={<CharacterDetailPlaceholder />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
