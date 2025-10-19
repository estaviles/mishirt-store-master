// src/pages/Productos.jsx
import React, { useMemo, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/Products";

// Normaliza para búsqueda sin acentos / mayúsculas
const norm = (s) =>
  (s || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export default function Productos({ onAdd }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  // Lee ?q= de la URL
  const [params] = useSearchParams();
  const qRaw = params.get("q") || "";
  const q = norm(qRaw);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const inPrice = p.precio >= minPrice && p.precio <= maxPrice;
      const inCat = selectedCategory === "Todas" || p.categoria === selectedCategory;

      // Campos a considerar en la búsqueda (según tu modelo)
      const hayQuery = !q
        ? true
        : norm(
            [
              p.nombre,
              p.descripcion,
              p.equipo,     // usado en ProductDetail
              p.meta,       // si existiera
              p.categoria,  // a veces útil
            ]
              .filter(Boolean)
              .join(" ")
          ).includes(q);

      return inPrice && inCat && hayQuery;
    });
  }, [minPrice, maxPrice, selectedCategory, q]);

  return (
    <Container className="py-3">
      <h2 className="page-title mb-3">Productos</h2>

      {/* Info de búsqueda */}
      {qRaw && (
        <Alert variant="light" className="border">
          Resultados para <strong>“{qRaw}”</strong> — {filteredProducts.length} encontrado(s)
        </Alert>
      )}

      <Row className="g-2 mb-3">
        <Col sm={6} md={3}>
          <Form.Label>Precio mínimo</Form.Label>
          <Form.Control
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
        </Col>
        <Col sm={6} md={3}>
          <Form.Label>Precio máximo</Form.Label>
          <Form.Control
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </Col>
        <Col sm={6} md={3}>
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Form.Select>
        </Col>
        <Col sm={6} md={3} className="d-flex align-items-end">
          <Button className="w-100" onClick={() => { /* useMemo ya filtra */ }}>
            Filtrar
          </Button>
        </Col>
      </Row>

      <Row className="g-3">
        {filteredProducts.map((p) => (
          <Col key={p.id} xs={12} sm={6} md={4}>
            {/* sin CTA en catálogo */}
            <ProductCard product={p} />
          </Col>
        ))}
        {filteredProducts.length === 0 && (
          <Col xs={12}>
            <Alert variant="secondary" className="text-center">
              No se encontraron productos.
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
}
