// src/pages/Home.jsx
import React from "react";
import { Container } from "react-bootstrap";
import HeroCarousel from "../components/HeroCarousel";
import CardsGrid from "../components/CardsGrid";
import { products } from "../data/Products";

import imgChile from "../assets/camiseta-chile-carousel.jpg";
import imgEsp from "../assets/seleccion_espanola.jpg";
import imgArg from "../assets/seleccion_argentina.jpg";

export default function Home() {
  const slides = [
    { src: imgChile, title: "SELECCIÓN CHILENA" },
    { src: imgEsp,   title: "SELECCIÓN ESPAÑOLA" },
    { src: imgArg,   title: "SELECCIÓN ARGENTINA" },
  ];

  const camisetasDestacadas = products.filter(p => p.destacado).slice(0, 3);


  return (
    <>
      <div className="container-fluid px-0 hero-wrapper">
        <HeroCarousel slides={slides} full height="72vh" />
      </div>

      <Container as="section" aria-labelledby="destacadas" className="mb-4 after-hero">
        <h2 id="destacadas" className="page-title text-center mb-3">
          Camisetas destacadas
        </h2>
        <CardsGrid items={camisetasDestacadas} />
      </Container>
    </>
  );

}
