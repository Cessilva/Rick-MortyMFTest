import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

const CharactersApp = lazy(() => import("characters/CharactersApp"));
const CharacterDetailApp = lazy(
  () => import("characterDetail/CharacterDetailApp"),
);

function CharacterDetailRoute() {
  const { id } = useParams();
  if (!id) return null;
  return <CharacterDetailApp id={id} />;
}

function Cargando() {
  return <p className="py-10 text-center text-white/60">Cargando módulo…</p>;
}

export default function App() {
  return (
    <div className="space-bg flex min-h-full flex-col">
      <Header />

      <main className="w-full flex-1 px-4 pb-6 pt-1">
        <Routes>
          <Route path="/" element={<Navigate to="/characters" replace />} />
          <Route
            path="/characters"
            element={
              <ErrorBoundary nombre="personajes">
                <Suspense fallback={<Cargando />}>
                  <CharactersApp />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="/character-detail/:id"
            element={
              <ErrorBoundary nombre="detalle del personaje">
                <Suspense fallback={<Cargando />}>
                  <CharacterDetailRoute />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
