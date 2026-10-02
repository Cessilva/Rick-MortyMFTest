import React from "react";
import { createRoot } from "react-dom/client";
import CharacterDetailApp from "./CharacterDetailApp";

const container = document.getElementById("root");

if (!container) {
  throw new Error("No se encontró el elemento #root en index.html");
}

createRoot(container).render(
  <React.StrictMode>
    <CharacterDetailApp id={1} />
  </React.StrictMode>
);
