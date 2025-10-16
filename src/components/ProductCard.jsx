import React from "react";
import { Card, Button } from "react-bootstrap";

// Formateador CLP robusto
const fmtCLP = (v) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(v || 0));

export default function ProductCard(props) {
  // Acepta product o item y evita undefined
  const product = props.product ?? props.item ?? {};
  const {
    nombre = "Sin nombre",
    descripcion = "",
    precio,
    img,
    meta,
    destacado = false,
  } = product;

  return (
    <Card className="product-card shadow-sm position-relative">
      {destacado && (
        <span className="pc-badge">Destacado</span>
      )}

      {!!img && (
        <Card.Img
          variant="top"
          src={img}
          alt={nombre}
          className="pc-img"
        />
      )}

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6 mb-1">{nombre}</Card.Title>
        {!!descripcion && (
          <Card.Text className="text-muted mb-2">{descripcion}</Card.Text>
        )}

        {/* Footer fijo: precio a la izq, botón a la derecha */}
        <div className="pc-footer">
          {precio != null && <strong className="pc-price">{fmtCLP(precio)}</strong>}
          {(props.showCTA || typeof props.onAdd === "function") && (
            <Button size="sm" onClick={() => props.onAdd?.(product)}>
              Agregar
            </Button>
          )}
        </div>

        {!!meta && <div className="small text-muted mt-2">{meta}</div>}
      </Card.Body>
    </Card>
  );
}
