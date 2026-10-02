import { useEffect, useState } from "react";
import { getCharacters } from "../services/charactersApi";
import { log } from "../services/logger";
import type { Character, CharacterFilters } from "../types/character";

interface UseCharactersResult {
  characters: Character[];
  loading: boolean;
  error: string | null;
  pages: number;
}

export function useCharacters(filters: CharacterFilters): UseCharactersResult {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    let activo = true;
    setLoading(true);
    setError(null);

    getCharacters(filters)
      .then((data) => {
        if (!activo) return;
        setCharacters(data.results);
        setPages(data.info.pages);
      })
      .catch((err) => {
        if (!activo) return;
        log.error("No se pudieron cargar los personajes", err);
        setError("No se pudieron cargar los personajes. Intenta de nuevo.");
        setCharacters([]);
      })
      .finally(() => {
        if (activo) setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, [filters.name, filters.status, filters.species, filters.page]);

  return { characters, loading, error, pages };
}
