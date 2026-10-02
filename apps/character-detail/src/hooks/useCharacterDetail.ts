import { useEffect, useState } from "react";
import { getCharacter, getEpisodes } from "../services/detailApi";
import { log } from "../services/logger";
import type { Character, Episode } from "../types/detail";

interface UseCharacterDetailResult {
  character: Character | null;
  episodes: Episode[];
  loading: boolean;
  error: string | null;
}

export function useCharacterDetail(
  id: string | number
): UseCharacterDetailResult {
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;
    setLoading(true);
    setError(null);

    getCharacter(id)
      .then(async (c) => {
        if (!activo) return;
        setCharacter(c);
        const eps = await getEpisodes(c.episode);
        if (activo) setEpisodes(eps);
      })
      .catch((err) => {
        if (!activo) return;
        log.error("No se pudo cargar el detalle", err);
        setError("No se pudo cargar el detalle del personaje.");
        setCharacter(null);
        setEpisodes([]);
      })
      .finally(() => {
        if (activo) setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, [id]);

  return { character, episodes, loading, error };
}
