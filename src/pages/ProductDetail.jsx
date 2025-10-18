
import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { products } from "../data/Products";

const fmtCLP = (v) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 })
    .format(Number(v || 0));

export default function ProductDetail({ onAdd }) {
  const { id } = useParams();
  const [tallaSel, setTallaSel] = useState(null);

  const product = useMemo(
    () => products.find((p) => String(p.id) === String(id)),
    [id]
  );

  if (!product) {
    return (
      <Container className="py-5">
        <h4 className="mb-3">Producto no encontrado</h4>
        <Button as={Link} to="/productos" variant="primary">Volver a productos</Button>
      </Container>
    );
  }

  const { nombre, descripcion, precio, img, equipo, categoria, tallas = [] } = product;
  const requiereTalla = Array.isArray(tallas) && tallas.length > 0;
  const puedeAgregar = !requiereTalla || !!tallaSel;

  const handleAdd = () => {
    onAdd?.({ ...product, talla: tallaSel || null });
  };

  return (
    <section className="product-detail py-4">
      <Container>
        <Row className="g-4 align-items-start">
          <Col md={6}>{img && <img src={img} alt={nombre} className="pd-img" />}</Col>

          <Col md={6}>
            <h2 className="fw-bold mb-3">{nombre}</h2>

            <div className="mb-3">
              {equipo && <div><strong>Equipo:</strong> {equipo}</div>}
              {/* Tu categoría ya ES el continente */}
              {categoria && <div><strong>Continente:</strong> {categoria}</div>}
            </div>

            <h4 className="fw-bolder mb-3">{fmtCLP(precio)}</h4>
            <hr className="mb-3" />

            {descripcion && (
              <>
                <h6 className="fw-bold">Descripción</h6>
                <p className="text-muted">{descripcion}</p>
              </>
            )}

            {requiereTalla && (
              <>
                <h6 className="fw-bold">Tallas disponibles</h6>
                <div className="d-flex gap-2 flex-wrap mb-3">
                  {tallas.map((t) => (
                    <Button
                      key={t}
                      size="sm"
                      variant={tallaSel === t ? "primary" : "outline-secondary"}
                      className="px-3"
                      onClick={() => setTallaSel(t)}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </>
            )}

            <Button
              size="lg"
              className="w-100"
              disabled={!puedeAgregar}
              title={puedeAgregar ? "" : "Selecciona una talla"}
              onClick={handleAdd}
            >
              Añadir al carrito
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
