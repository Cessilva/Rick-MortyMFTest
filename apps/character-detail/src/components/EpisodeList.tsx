import type { Episode } from "../types/detail";

interface Props {
  episodes: Episode[];
}

export default function EpisodeList({ episodes }: Props) {
  return (
    <div className="w-full min-w-0">
      <h3 className="mb-3 text-center text-lg font-semibold text-portal-green">
        Episodios ({episodes.length})
      </h3>
      <ul className="grid max-h-80 w-full list-none grid-cols-2 gap-2 overflow-y-auto overflow-x-hidden p-0 sm:grid-cols-1 lg:grid-cols-2">
        {episodes.map((ep) => (
          <li
            key={ep.id}
            className="min-w-0 rounded-md bg-portal-card px-2 py-2 ring-1 ring-white/10"
          >
            <div className="flex items-center gap-2">
              <span className="shrink-0 rounded bg-portal-green/15 px-1.5 py-0.5 text-[11px] font-medium text-portal-green">
                {ep.episode}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-white">
                {ep.name}
              </span>
            </div>
            <p className="mt-1 truncate text-[11px] text-white/50">
              {ep.air_date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
