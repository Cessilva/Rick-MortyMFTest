import { useCharacters } from "./hooks/useCharacters";
import { useFilters } from "./hooks/useFilters";
import CharacterList from "./components/CharacterList";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";

export default function CharactersApp() {
  const {
    filters,
    debouncedFilters,
    setFilter,
    setPage,
    clearFilters,
    hasActiveFilters,
  } = useFilters();
  const { characters, loading, error, pages } = useCharacters(debouncedFilters);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6">
      <h2 className="mb-4 text-xl font-bold text-portal-green">Personajes</h2>
      <Filters
        filters={filters}
        setFilter={setFilter}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />
      <CharacterList characters={characters} loading={loading} error={error} />
      {!loading && !error && (
        <Pagination
          page={filters.page ?? 1}
          totalPages={pages}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}
