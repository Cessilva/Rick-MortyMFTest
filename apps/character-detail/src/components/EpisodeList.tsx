import type { Episode } from "../types/detail";

interface Props {
  episodes: Episode[];
}

export default function EpisodeList({ episodes }: Props) {
  return (
    <div className="cd-w-full cd-min-w-0">
      <h3 className="cd-mb-3 cd-text-center cd-text-lg cd-font-semibold cd-text-portal-green">
        Episodios ({episodes.length})
      </h3>
      <ul className="cd-grid cd-max-h-80 cd-w-full cd-list-none cd-grid-cols-2 cd-gap-2 cd-overflow-y-auto cd-overflow-x-hidden cd-p-0 sm:cd-grid-cols-1 lg:cd-grid-cols-2">
        {episodes.map((ep) => (
          <li
            key={ep.id}
            className="cd-min-w-0 cd-rounded-md cd-bg-portal-card cd-px-2 cd-py-2 cd-ring-1 cd-ring-white/10"
          >
            <div className="cd-flex cd-items-center cd-gap-2">
              <span className="cd-shrink-0 cd-rounded cd-bg-portal-green/15 cd-px-1.5 cd-py-0.5 cd-text-[11px] cd-font-medium cd-text-portal-green">
                {ep.episode}
              </span>
              <span className="cd-min-w-0 cd-flex-1 cd-truncate cd-text-sm cd-text-white">
                {ep.name}
              </span>
            </div>
            <p className="cd-mt-1 cd-truncate cd-text-[11px] cd-text-white/50">
              {ep.air_date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
