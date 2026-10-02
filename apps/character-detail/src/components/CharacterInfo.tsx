import type { Character, CharacterStatus } from "../types/detail";

const statusColor: Record<CharacterStatus, string> = {
  Alive: "cd-bg-green-500",
  Dead: "cd-bg-red-500",
  unknown: "cd-bg-gray-500",
};

interface Props {
  character: Character;
}

function Dato({ label, value }: { label: string; value: string }) {
  return (
    <p className="cd-text-sm md:cd-text-base">
      <span className="cd-text-white/50">{label}: </span>
      <span className="cd-text-white">{value}</span>
    </p>
  );
}

export default function CharacterInfo({ character }: Props) {
  return (
    <div className="cd-flex cd-w-full cd-justify-center cd-flex-col cd-items-center cd-gap-4 cd-text-center md:cd-flex-row md:cd-items-center md:cd-gap-6 md:cd-text-left">
      <img
        src={character.image}
        alt={character.name}
        className="cd-aspect-square cd-w-full cd-max-w-xs cd-rounded-lg cd-object-cover cd-ring-1 cd-ring-white/10 md:cd-h-56 md:cd-w-56 md:cd-max-w-none md:cd-shrink-0"
      />
      <div className="cd-space-y-2 md:cd-space-y-3">
        <h2 className="cd-text-2xl cd-font-bold cd-text-white md:cd-text-3xl">
          {character.name}
        </h2>
        <p className="cd-flex cd-items-center cd-justify-center cd-gap-2 cd-text-sm cd-text-white/80 md:cd-justify-start md:cd-text-base">
          <span
            className={`cd-inline-block cd-h-2.5 cd-w-2.5 cd-rounded-full ${statusColor[character.status]} md:cd-h-3 md:cd-w-3`}
          />
          {character.status} — {character.species}
        </p>
        <Dato label="Género" value={character.gender} />
        <Dato label="Origen" value={character.origin.name} />
        <Dato label="Ubicación" value={character.location.name} />
      </div>
    </div>
  );
}
