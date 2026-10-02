import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacterCard from "./CharacterCard";
import { navegarA } from "../services/navigation";
import type { Character } from "../types/character";

jest.mock("../services/navigation", () => ({
  navegarA: jest.fn(),
}));

const rick: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [],
  url: "",
};

describe("CharacterCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("muestra el nombre, el estado y la especie del personaje", () => {
    render(<CharacterCard character={rick} />);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText(/Alive — Human/)).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
  });

  it("es un enlace que apunta al detalle del personaje", () => {
    render(<CharacterCard character={rick} />);

    const enlace = screen.getByRole("link");
    expect(enlace).toHaveAttribute("href", "/character-detail/1");
  });

  it("renderiza la imagen con el alt del nombre", () => {
    render(<CharacterCard character={rick} />);

    const img = screen.getByAltText("Rick Sanchez");
    expect(img).toHaveAttribute("src", rick.image);
  });

  it("al hacer clic navega al detalle (SPA) sin recargar", async () => {
    render(<CharacterCard character={rick} />);

    await userEvent.click(screen.getByRole("link"));

    expect(navegarA).toHaveBeenCalledWith("/character-detail/1");
  });
});
