// tests/HeroCarousel.spec.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import HeroCarousel from "../src/components/HeroCarousel";

describe("HeroCarousel", () => {
  it("renderiza una imagen por slide", () => {
    const slides = [{ src: "/a.png" }, { src: "/b.png" }, { src: "/c.png" }];
    render(<HeroCarousel slides={slides} />);
    // Cuando no hay alt, el componente usa "slide {i+1}"
    expect(screen.getByAltText("slide 1")).toBeInTheDocument();
    expect(screen.getByAltText("slide 2")).toBeInTheDocument();
    expect(screen.getByAltText("slide 3")).toBeInTheDocument();
  });

  it("muestra el título del slide cuando viene en los datos", () => {
    const slides = [{ src: "/x.png", title: "SELECCIÓN CHILENA" }];
    render(<HeroCarousel slides={slides} />);
    expect(screen.getByText(/selección chilena/i)).toBeInTheDocument();
  });
});
