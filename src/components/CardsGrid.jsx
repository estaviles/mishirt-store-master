import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

export default function CardsGrid({ items, showCTA = false, onAdd }) {
  const safeItems = Array.isArray(items) ? items : [];
  return (
    <Row className="g-3">
      {safeItems.map((it) => (
        <Col key={it.id} xs={12} sm={6} md={4}>
          <ProductCard item={it} showCTA={showCTA} onAdd={onAdd} />
        </Col>
      ))}
    </Row>
  );
}
