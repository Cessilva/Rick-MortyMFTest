import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("No se encontró el elemento #root en index.html");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* BrowserRouter vive en el shell: el host es el dueño del ruteo. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
