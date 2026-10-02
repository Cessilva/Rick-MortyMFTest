declare module "characters/CharactersApp" {
  import type { ComponentType } from "react";
  const CharactersApp: ComponentType;
  export default CharactersApp;
}

declare module "characterDetail/CharacterDetailApp" {
  import type { ComponentType } from "react";
  const CharacterDetailApp: ComponentType<{ id: string | number }>;
  export default CharacterDetailApp;
}
