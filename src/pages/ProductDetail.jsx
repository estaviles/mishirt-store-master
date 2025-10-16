import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { products } from "../data/Products";

// CLP formatter
const fmtCLP = (v) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 })
    .format(Number(v || 0));

export default function ProductDetail({ onAdd }) {
  const { id } = useParams();

  const product = useMemo(
    () => products.find(p => String(p.id) === String(id)),
    [id]
  );

  if (!product) {
    return (
      <Container className="py-5">
        <h4 className="mb-3">Producto no encontrado</h4>
        <p>El producto que buscas no existe o fue removido.</p>
        <Button as={Link} to="/productos" variant="primary">Volver a productos</Button>
      </Container>
    );
  }

  const {
    nombre, descripcion, precio, img,
    equipo, continente, categoria, tallas = []
  } = product;

  return (
    <section className="product-detail py-4">
      <Container>
        <Row className="g-4 align-items-start">
          <Col md={6}>
            {!!img && (
              <img src={img} alt={nombre} className="pd-img" />
            )}
          </Col>

          <Col md={6}>
            <h2 className="fw-bold mb-3">{nombre}</h2>

            <div className="mb-3">
              {equipo && (<div><strong>Equipo:</strong> {equipo}</div>)}
              {(continente || categoria) && (
                <div><strong>Continente:</strong> {continente ?? categoria}</div>
              )}
            </div>

            <h4 className="fw-bolder mb-3">{fmtCLP(precio)}</h4>
            <hr className="mb-3"/>

            {descripcion && (
              <>
                <h6 className="fw-bold">Descripción</h6>
                <p className="text-muted">{descripcion}</p>
              </>
            )}

            {Array.isArray(tallas) && tallas.length > 0 && (
              <>
                <h6 className="fw-bold">Tallas disponibles</h6>
                <div className="d-flex gap-2 flex-wrap mb-3">
                  {tallas.map(t => (
                    <Badge bg="light" text="dark" key={t} className="border rounded-3 px-3 py-2">
                      {t}
                    </Badge>
                  ))}
                </div>
              </>
            )}

            <Button
              size="lg"
              className="w-100"
              onClick={() => onAdd?.(product)}
            >
              Añadir al carrito
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
