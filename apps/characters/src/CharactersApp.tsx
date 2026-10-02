import { useCharacters } from "./hooks/useCharacters";
import CharacterList from "./components/CharacterList";

export default function CharactersApp() {
  const { characters, loading, error } = useCharacters({});

  return (
    <section className="portal-cursor mx-auto w-full max-w-6xl px-4 py-6">
      <h2 className="mb-4 text-xl font-bold text-portal-green">Personajes</h2>
      <CharacterList characters={characters} loading={loading} error={error} />
    </section>
  );
}
