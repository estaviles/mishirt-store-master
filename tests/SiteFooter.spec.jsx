// tests/SiteFooter.spec.jsx
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";
import SiteFooter from "../src/components/SiteFooter";

describe("SiteFooter", () => {
  it("muestra la marca (heading h5) y el año actual", () => {
    render(
      <MemoryRouter>
        <SiteFooter />
      </MemoryRouter>
    );

    // Marca: apunta específicamente al heading h5 con ese texto
    const brand = screen.getByRole("heading", { level: 5, name: /mishirt/i });
    expect(brand).toBeInTheDocument();

    // Año: búscalo dentro del <footer> (role="contentinfo")
    const footer = screen.getByRole("contentinfo");
    const year = String(new Date().getFullYear());
    expect(within(footer).getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("incluye links a Contacto, Quienes Somos y Blog", () => {
    render(
      <MemoryRouter>
        <SiteFooter />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /contacto/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /quienes somos/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /blog/i })).toBeInTheDocument();
  });
});
