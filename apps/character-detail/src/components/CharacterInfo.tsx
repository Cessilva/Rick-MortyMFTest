import type { Character, CharacterStatus } from "../types/detail";

const statusColor: Record<CharacterStatus, string> = {
  Alive: "bg-green-500",
  Dead: "bg-red-500",
  unknown: "bg-gray-500",
};

interface Props {
  character: Character;
}

function Dato({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm md:text-base">
      <span className="text-white/50">{label}: </span>
      <span className="text-white">{value}</span>
    </p>
  );
}

export default function CharacterInfo({ character }: Props) {
  return (
    <div className="flex w-ful justify-center  flex-col items-center gap-4 text-center md:flex-row md:items-center md:gap-6 md:text-left">
      <img
        src={character.image}
        alt={character.name}
        className="aspect-square w-full max-w-xs rounded-lg object-cover ring-1 ring-white/10 md:h-56 md:w-56 md:max-w-none md:shrink-0"
      />
      <div className="space-y-2 md:space-y-3">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          {character.name}
        </h2>
        <p className="flex items-center justify-center gap-2 text-sm text-white/80 md:justify-start md:text-base">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${statusColor[character.status]} md:h-3 md:w-3`}
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
