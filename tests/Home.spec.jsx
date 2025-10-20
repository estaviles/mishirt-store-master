// tests/Home.spec.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../src/pages/Home";

describe("Home (página real)", () => {
  it('muestra el título "Camisetas destacadas"', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: /camisetas destacadas/i })
    ).toBeInTheDocument();
  });

  it("renderiza 3 links de 'Ver ...' (una por imagen de cada destacada)", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    // En ProductCard, la imagen está envuelta con aria-label="Ver {nombre}"
    const verLinks = screen.getAllByRole("link", { name: /ver/i });
    expect(verLinks.length).toBe(3);
  });
});
