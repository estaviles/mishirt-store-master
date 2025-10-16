// src/components/HeroCarousel.jsx
import React from "react";
import { Carousel } from "react-bootstrap";

export default function HeroCarousel({ slides = [], full = false, height = "68vh" }) {
  return (
    <Carousel pause="hover" indicators controls>
      {slides.map((s, i) => (
        <Carousel.Item key={i} interval={4000}>
          {/* Marco con la altura controlada */}
          <div
            className={`hero-frame ${full ? "hero-full" : ""}`}
            style={{ height }}
          >
            <img
              src={s.src}
              alt={s.alt || `slide ${i + 1}`}
              className="hero-img"
            />
          </div>

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
