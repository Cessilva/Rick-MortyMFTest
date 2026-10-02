import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const CharactersApp = lazy(() => import("characters/CharactersApp"));

function CharacterDetailPlaceholder() {
  const { id } = useParams();
  return (
    <div className="text-center text-white/70">
      <p className="text-lg">Microfrontend de detalle del personaje {id}.</p>
      <p className="text-sm text-white/40">(remote: characterDetail @ :3002)</p>
    </div>
  );
}

function Cargando() {
  return <p className="py-10 text-center text-white/60">Cargando módulo…</p>;
}

export default function App() {
  return (
    <div className="space-bg flex min-h-full flex-col">
      <Header />

      <main className="w-full flex-1 px-4 pb-6 pt-1">
        <Suspense fallback={<Cargando />}>
          <Routes>
            <Route path="/" element={<Navigate to="/characters" replace />} />
            <Route path="/characters" element={<CharactersApp />} />
            <Route
              path="/character-detail/:id"
              element={<CharacterDetailPlaceholder />}
            />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
