import React from "react";
import { createRoot } from "react-dom/client";
import CharactersApp from "./CharactersApp";
import "./index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("No se encontró el elemento #root en index.html");
}

createRoot(container).render(
  <React.StrictMode>
    <CharactersApp />
  </React.StrictMode>
);
