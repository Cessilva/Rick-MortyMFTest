import { useEffect, useState } from "react";
import type { CharacterFilters } from "../types/character";

function readFiltersFromUrl(): CharacterFilters {
  const params = new URLSearchParams(window.location.search);
  const page = Number(params.get("page"));
  return {
    name: params.get("name") ?? "",
    status: params.get("status") ?? "",
    species: params.get("species") ?? "",
    page: page > 0 ? page : 1,
  };
}

function writeFiltersToUrl(filters: CharacterFilters) {
  const params = new URLSearchParams();
  if (filters.name) params.set("name", filters.name);
  if (filters.status) params.set("status", filters.status);
  if (filters.species) params.set("species", filters.species);
  if (filters.page && filters.page > 1)
    params.set("page", String(filters.page));

  const query = params.toString();
  const url = query ? `?${query}` : window.location.pathname;
  window.history.replaceState(null, "", url);
}

interface UseFiltersResult {
  filters: CharacterFilters;
  debouncedFilters: CharacterFilters;
  setFilter: (key: keyof CharacterFilters, value: string) => void;
  setPage: (page: number) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export function useFilters(): UseFiltersResult {
  const [filters, setFilters] = useState<CharacterFilters>(readFiltersFromUrl);
  const [debouncedFilters, setDebouncedFilters] =
    useState<CharacterFilters>(filters);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedFilters(filters);
      writeFiltersToUrl(filters);
    }, 400);
    return () => clearTimeout(id);
  }, [filters.name, filters.status, filters.species]);

  useEffect(() => {
    setDebouncedFilters((prev) => ({ ...prev, page: filters.page }));
    writeFiltersToUrl(filters);
  }, [filters.page]);

  const setFilter = (key: keyof CharacterFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const setPage = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const clearFilters = () => {
    const empty: CharacterFilters = {
      name: "",
      status: "",
      species: "",
      page: 1,
    };
    setFilters(empty);
    setDebouncedFilters(empty);
    writeFiltersToUrl(empty);
  };

  const hasActiveFilters = Boolean(
    filters.name || filters.status || filters.species,
  );

  return {
    filters,
    debouncedFilters,
    setFilter,
    setPage,
    clearFilters,
    hasActiveFilters,
  };
}
