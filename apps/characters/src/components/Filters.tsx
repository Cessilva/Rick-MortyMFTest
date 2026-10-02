import type { CharacterFilters } from "../types/character";
import { SPECIES } from "../constants/species";

interface Props {
  filters: CharacterFilters;
  setFilter: (key: keyof CharacterFilters, value: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export default function Filters({
  filters,
  setFilter,
  clearFilters,
  hasActiveFilters,
}: Props) {
  const inputClass =
    "w-full rounded-md bg-portal-card px-3 py-2 text-sm text-white placeholder-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-portal-green/60 sm:w-auto sm:min-w-[10rem] sm:flex-1";

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <input
        type="text"
        value={filters.name ?? ""}
        onChange={(e) => setFilter("name", e.target.value)}
        placeholder="Buscar por nombre…"
        className={inputClass}
      />

      <select
        value={filters.status ?? ""}
        onChange={(e) => setFilter("status", e.target.value)}
        className={inputClass}
      >
        <option value="">Estado (todos)</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select
        value={filters.species ?? ""}
        onChange={(e) => setFilter("species", e.target.value)}
        className={inputClass}
      >
        <option value="">Especie (todas)</option>
        {SPECIES.map((especie) => (
          <option key={especie} value={especie}>
            {especie === "unknown" ? "Unknown" : especie}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="w-full shrink-0 rounded-md px-3 py-2 text-sm text-portal-green ring-1 ring-portal-green/40 transition hover:bg-portal-green/10 sm:w-auto"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
