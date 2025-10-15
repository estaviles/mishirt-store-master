import React from "react";
import { Carousel } from "react-bootstrap";

export default function HeroCarousel({ slides = [] }) {
  return (
    <Carousel pause="hover" indicators controls>
      {slides.map((s, i) => (
        <Carousel.Item key={i} interval={4000}>
          <img
            src={s.src}
            alt={s.alt || `slide ${i + 1}`}
            className="d-block w-100 rounded-3 shadow"
            style={{ maxHeight: 420, objectFit: "cover" }}
          />

          {/* Solo TÍTULO (sin descripción ni botón) */}
          {s.title && (
            <Carousel.Caption className="hero-caption mb-4">
              <h3 className="hero-title">{s.title}</h3>
            </Carousel.Caption>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
