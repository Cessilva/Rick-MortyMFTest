import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filters from "./Filters";
import type { CharacterFilters } from "../types/character";

const sinFiltros: CharacterFilters = {
  name: "",
  status: "",
  species: "",
  page: 1,
};

describe("Filters", () => {
  it("llama a setFilter con la clave 'name' al escribir en el buscador", async () => {
    const setFilter = jest.fn();
    render(
      <Filters
        filters={sinFiltros}
        setFilter={setFilter}
        clearFilters={() => {}}
        hasActiveFilters={false}
      />,
    );

    const input = screen.getByPlaceholderText(/Buscar por nombre/i);
    await userEvent.type(input, "R");

    expect(setFilter).toHaveBeenCalledWith("name", "R");
  });

  it("llama a setFilter con la clave 'status' al elegir un estado", async () => {
    const setFilter = jest.fn();
    render(
      <Filters
        filters={sinFiltros}
        setFilter={setFilter}
        clearFilters={() => {}}
        hasActiveFilters={false}
      />,
    );

    const selectEstado = screen.getByDisplayValue("Estado (todos)");
    await userEvent.selectOptions(selectEstado, "alive");

    expect(setFilter).toHaveBeenCalledWith("status", "alive");
  });

  it("llama a setFilter con la clave 'species' al elegir una especie", async () => {
    const setFilter = jest.fn();
    render(
      <Filters
        filters={sinFiltros}
        setFilter={setFilter}
        clearFilters={() => {}}
        hasActiveFilters={false}
      />,
    );

    const selectEspecie = screen.getByDisplayValue("Especie (todas)");
    await userEvent.selectOptions(selectEspecie, "Human");

    expect(setFilter).toHaveBeenCalledWith("species", "Human");
  });

  it("no muestra 'Limpiar filtros' cuando no hay filtros activos", () => {
    render(
      <Filters
        filters={sinFiltros}
        setFilter={() => {}}
        clearFilters={() => {}}
        hasActiveFilters={false}
      />,
    );

    expect(
      screen.queryByRole("button", { name: /Limpiar filtros/i }),
    ).not.toBeInTheDocument();
  });

  it("muestra 'Limpiar filtros' y lo invoca al hacer clic cuando hay filtros activos", async () => {
    const clearFilters = jest.fn();
    render(
      <Filters
        filters={{ ...sinFiltros, name: "Rick" }}
        setFilter={() => {}}
        clearFilters={clearFilters}
        hasActiveFilters={true}
      />,
    );

    const boton = screen.getByRole("button", { name: /Limpiar filtros/i });
    await userEvent.click(boton);

    expect(clearFilters).toHaveBeenCalledTimes(1);
  });
});
