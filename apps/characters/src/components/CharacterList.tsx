import type { Character } from "../types/character";
import CharacterCard from "./CharacterCard";

interface Props {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

export default function CharacterList({ characters, loading, error }: Props) {
  if (loading) {
    return (
      <p className="py-10 text-center text-white/60">Cargando personajes…</p>
    );
  }

  if (error) {
    return <p className="py-10 text-center text-red-400">{error}</p>;
  }

  if (characters.length === 0) {
    return (
      <p className="py-10 text-center text-white/60">
        No se encontraron personajes.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
