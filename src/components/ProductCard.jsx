import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const fmtCLP = (v) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 })
    .format(Number(v || 0));

export default function ProductCard({ product, item, onAdd, showCTA }) {
  const navigate = useNavigate();
  const p = product ?? item ?? {};
  const { id, nombre, descripcion, precio, img, meta, destacado, tallas } = p;
  const toDetail = id != null ? `/producto/${id}` : null;

  const handleAdd = () => {
    const tieneTallas = Array.isArray(tallas) && tallas.length > 0;
    if (tieneTallas && toDetail) {
      navigate(toDetail); // que elija talla
      return;
    }
    onAdd?.(p); // sin tallas, agrega directo
  };

  return (
    <Card className="product-card shadow-sm position-relative">
      {!!img && (toDetail ? (
        <Link to={toDetail} className="d-block" aria-label={`Ver ${nombre}`}>
          <Card.Img variant="top" src={img} alt={nombre} className="pc-img" />
        </Link>
      ) : (
        <Card.Img variant="top" src={img} alt={nombre} className="pc-img" />
      ))}

      <Card.Body className="d-flex flex-column position-relative">
        {toDetail ? (
          <Card.Title className="fs-6 mb-1">
            <Link to={toDetail} className="stretched-link text-reset text-decoration-none">
              {nombre}
            </Link>
          </Card.Title>
        ) : (
          <Card.Title className="fs-6 mb-1">{nombre}</Card.Title>
        )}

        {descripcion && <p className="small text-muted mb-2">{descripcion}</p>}

        <div className="pc-footer">
          {precio != null && <strong className="pc-price">{fmtCLP(precio)}</strong>}
          {(showCTA || typeof onAdd === "function") && (
            <Button size="sm" onClick={handleAdd}>Agregar</Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
