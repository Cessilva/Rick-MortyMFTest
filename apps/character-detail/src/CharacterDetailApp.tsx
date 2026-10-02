import "./index.css";
import { useCharacterDetail } from "./hooks/useCharacterDetail";
import { navegarA } from "./services/navigation";
import CharacterInfo from "./components/CharacterInfo";
import EpisodeList from "./components/EpisodeList";

interface Props {
  id: string | number;
}

export default function CharacterDetailApp({ id }: Props) {
  const { character, episodes, loading, error } = useCharacterDetail(id);

  if (loading) {
    return (
      <p className="cd-py-10 cd-text-center cd-text-white/60">
        Cargando detalle…
      </p>
    );
  }

  if (error || !character) {
    return (
      <div className="cd-flex cd-min-h-[50vh] cd-w-full cd-flex-col cd-items-center cd-justify-center cd-gap-4 cd-px-4 cd-text-center">
        <p className="cd-text-red-400">
          {error ?? "No se encontró el personaje."}
        </p>
        <button
          type="button"
          onClick={() => navegarA("/characters")}
          className="cd-rounded-md cd-px-3 cd-py-2 cd-text-sm cd-text-portal-green cd-ring-1 cd-ring-portal-green/40 cd-transition hover:cd-bg-portal-green/10"
        >
          ← Volver a personajes
        </button>
      </div>
    );
  }

  return (
    <section className="cd-flex cd-min-h-[70vh] cd-w-full cd-items-center cd-justify-center cd-px-3 cd-py-4 sm:cd-px-4 sm:cd-py-6">
      <div className="cd-w-full cd-max-w-5xl">
        <button
          type="button"
          onClick={() => navegarA("/characters")}
          className="cd-mb-4 cd-rounded-md cd-px-3 cd-py-2 cd-text-sm cd-text-portal-green cd-ring-1 cd-ring-portal-green/40 cd-transition hover:cd-bg-portal-green/10"
        >
          ← Volver a personajes
        </button>
        <div className="cd-grid cd-w-full cd-grid-cols-1 cd-gap-6 cd-rounded-xl cd-bg-portal-card/60 cd-p-4 cd-shadow-xl cd-ring-1 cd-ring-white/10 cd-backdrop-blur-sm sm:cd-p-6 md:cd-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:cd-gap-8">
          <div className="cd-flex cd-min-w-0 cd-items-center cd-justify-center">
            <CharacterInfo character={character} />
          </div>
          <div className="cd-min-w-0">
            <EpisodeList episodes={episodes} />
          </div>
        </div>
      </div>
    </section>
  );
}
