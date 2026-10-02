import type { MouseEvent } from "react";
import type { Character, CharacterStatus } from "../types/character";
import { navegarA } from "../services/navigation";

const statusColor: Record<CharacterStatus, string> = {
  Alive: "bg-green-500 shadow-[0_0_6px] shadow-green-500/70",
  Dead: "bg-red-500 shadow-[0_0_6px] shadow-red-500/70",
  unknown: "bg-gray-500 shadow-[0_0_6px] shadow-gray-500/70",
};

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  const href = `/character-detail/${character.id}`;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navegarA(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="portal-cursor-pointer group block overflow-hidden rounded-lg bg-portal-card shadow-md ring-1 ring-white/10 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-portal-green/20 hover:ring-portal-green/50"
    >
      <div className="overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-48 lg:h-56"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h3 className="truncate text-base font-semibold text-white">
          {character.name}
        </h3>

        <p className="mt-1 flex items-center gap-2 text-sm text-white/80">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${statusColor[character.status]}`}
          />
          {character.status} — {character.species}
        </p>

        <p className="mt-1 text-xs text-white/50">{character.gender}</p>
      </div>
    </a>
  );
}
