import "./index.css";
import { useCharacterDetail } from "./hooks/useCharacterDetail";
import CharacterInfo from "./components/CharacterInfo";
import EpisodeList from "./components/EpisodeList";

interface Props {
  id: string | number;
}

export default function CharacterDetailApp({ id }: Props) {
  const { character, episodes, loading, error } = useCharacterDetail(id);

  if (loading) {
    return <p className="py-10 text-center text-white/60">Cargando detalle…</p>;
  }

  if (error || !character) {
    return (
      <p className="py-10 text-center text-red-400">
        {error ?? "No se encontró el personaje."}
      </p>
    );
  }

  return (
    <section className="flex min-h-[70vh] w-full items-center justify-center px-3 py-4 sm:px-4 sm:py-6">
      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 rounded-xl bg-portal-card/60 p-4 shadow-xl ring-1 ring-white/10 backdrop-blur-sm sm:p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-8">
        <div className="flex min-w-0 items-center justify-center">
          <CharacterInfo character={character} />
        </div>
        <div className="min-w-0">
          <EpisodeList episodes={episodes} />
        </div>
      </div>
    </section>
  );
}
