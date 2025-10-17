import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    id,                     // asegúrate de tener id en tus datos
    nombre = "Sin nombre",
    descripcion = "",
    precio,
    img,
    meta,
    destacado = false,
  } = product;

  // ruta al detalle (si hay id)
  const toDetail = id != null ? `/producto/${id}` : null;

  // NUEVO: flags de visibilidad (por defecto oculto)
  const showDescription = props.showDescription === true;
  const showMeta = props.showMeta === true;

  return (
    <Card className="product-card shadow-sm position-relative">
      {destacado && <span className="pc-badge">Destacado</span>}

      {!!img && (
        toDetail ? (
          <Link to={toDetail} className="d-block" aria-label={`Ver ${nombre}`}>
            <Card.Img variant="top" src={img} alt={nombre} className="pc-img" />
          </Link>
        ) : (
          <Card.Img variant="top" src={img} alt={nombre} className="pc-img" />
        )
      )}

      <Card.Body className="d-flex flex-column position-relative">
        {/* Título clicable sin interferir con el botón gracias a stretched-link */}
        {toDetail ? (
          <Card.Title className="fs-6 mb-1">
            <Link to={toDetail} className="stretched-link text-reset text-decoration-none">
              {nombre}
            </Link>
          </Card.Title>
        ) : (
          <Card.Title className="fs-6 mb-1">{nombre}</Card.Title>
        )}

        {/* Solo mostrar si se pide explícitamente */}
        {showDescription && !!descripcion && (
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

        {/* Meta también oculto por defecto */}
        {showMeta && !!meta && <div className="small text-muted mt-2">{meta}</div>}
      </Card.Body>
    </Card>
  );
}
