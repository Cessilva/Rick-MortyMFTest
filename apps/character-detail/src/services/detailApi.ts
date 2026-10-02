import type { Character, Episode } from "../types/detail";
import { log } from "./logger";

const BASE = "https://rickandmortyapi.com/api";

export async function getCharacter(id: string | number): Promise<Character> {
  const res = await fetch(`${BASE}/character/${id}`);
  if (!res.ok) {
    log.error("Error al pedir el personaje", { id, status: res.status });
    throw new Error(`La API respondió ${res.status}`);
  }
  return res.json();
}

function idsDeEpisodios(urls: string[]): string[] {
  return urls
    .map((u) => u.split("/").pop() ?? "")
    .filter((id) => id !== "");
}

export async function getEpisodes(episodeUrls: string[]): Promise<Episode[]> {
  const ids = idsDeEpisodios(episodeUrls);
  if (ids.length === 0) return [];

  const res = await fetch(`${BASE}/episode/${ids.join(",")}`);
  if (!res.ok) {
    log.error("Error al pedir los episodios", { status: res.status });
    throw new Error(`La API respondió ${res.status}`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}
