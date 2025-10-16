import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroCarousel from "../components/HeroCarousel";
import CardsGrid from "../components/CardsGrid";
import { products } from "../data/Products"; // <-- fuente única

// Imágenes del carrusel (se mantienen)
import imgChile from "../assets/seleccion_chilena.jpg";
import imgEsp from "../assets/seleccion_espanola.jpg";
import imgArg from "../assets/seleccion_argentina.jpg";

export default function Home({ onAdd }) {
  const slides = [
    { src: imgChile, title: "SELECCIÓN CHILENA" },
    { src: imgEsp,   title: "SELECCIÓN ESPAÑOLA" },
    { src: imgArg,   title: "SELECCIÓN ARGENTINA" },
  ];

  // toma 3 productos marcados como 'destacado' en Products.js
  const camisetasDestacadas = products.filter(p => p.destacado).slice(0, 3);

  return (
    <Container className="mb-4">
      <Row className="mb-4">
        <Col>
          <HeroCarousel slides={slides} />
        </Col>
      </Row>

      <CardsGrid items={camisetasDestacadas} showCTA onAdd={onAdd} />
    </Container>
  );
}
