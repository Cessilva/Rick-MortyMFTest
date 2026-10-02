import type {
  CharactersResponse,
  CharacterFilters,
} from "../types/character";
import { log } from "./logger";

const BASE_URL = "https://rickandmortyapi.com/api/character";

function buildQuery(filters: CharacterFilters): string {
  const params = new URLSearchParams();
  if (filters.name) params.set("name", filters.name);
  if (filters.status) params.set("status", filters.status);
  if (filters.species) params.set("species", filters.species);
  if (filters.page) params.set("page", String(filters.page));
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export async function getCharacters(
  filters: CharacterFilters = {}
): Promise<CharactersResponse> {
  const url = `${BASE_URL}${buildQuery(filters)}`;

  const res = await fetch(url);

  if (res.status === 404) {
    return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  }

  if (!res.ok) {
    log.error("Error al pedir personajes", { url, status: res.status });
    throw new Error(`La API respondió ${res.status}`);
  }

  return res.json();
}
