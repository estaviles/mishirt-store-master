// src/pages/Productos.jsx
import React, { useMemo, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/Products";

export default function Productos({ onAdd }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const priceInRange = p.precio >= minPrice && p.precio <= maxPrice;
      const inCat = selectedCategory === "Todas" || p.categoria === selectedCategory;
      return priceInRange && inCat;
    });
  }, [minPrice, maxPrice, selectedCategory]);

  return (
    <Container className="py-3">
      <h2 className="page-title mb-3">Productos</h2>

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
            onChange={(e) => setSelectedCategory(e.target.value)}>
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
            <ProductCard product={p} onAdd={onAdd} showCTA />
            </Col>
        ))}
        </Row>

    </Container>
  );
}
