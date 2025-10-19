// src/pages/Comprobante.jsx
import React, { useMemo } from "react";
import { Container, Card, Table, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const fmtCLP = (v) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 })
    .format(Number(v || 0));

export default function Comprobante() {
  const order = useMemo(() => {
    try {
      const raw = localStorage.getItem("tg_lastOrder");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  if (!order) {
    return (
      <Container className="py-4">
        <Alert variant="warning" className="mb-3">
          No encontramos un comprobante reciente.
        </Alert>
        <Button as={Link} to="/productos" variant="primary">Ir al catálogo</Button>
      </Container>
    );
  }

  const fecha = new Date(order.date);

  return (
    <Container className="py-3">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2 className="page-title mb-1">Comprobante de compra</h2>
          <div className="text-muted">
            <span className="me-3">Orden: <strong>{order.id}</strong></span>
            <span>Fecha: {fecha.toLocaleDateString()} {fecha.toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="d-flex gap-2">
          {/* Eliminado: botón Imprimir / PDF */}
          <Button as={Link} to="/" variant="primary">Volver al inicio</Button>
        </div>
      </div>

      <Card className="p-3 mb-3">
        <h5 className="mb-3">Datos del comprador</h5>
        <div className="row">
          <div className="col-md-4">
            <div className="text-muted">Nombre</div>
            <div className="fw-semibold">{order.buyer?.nombre}</div>
          </div>
          <div className="col-md-4">
            <div className="text-muted">Email</div>
            <div className="fw-semibold">{order.buyer?.email}</div>
          </div>
          <div className="col-md-4">
            <div className="text-muted">Teléfono</div>
            <div className="fw-semibold">{order.buyer?.phone}</div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <div className="text-muted">Entrega</div>
            <div className="fw-semibold">
              {order.entrega?.tipo === "domicilio" ? "Envío a domicilio" : "Retiro en tienda"}
            </div>
          </div>
          {order.entrega?.tipo === "domicilio" && (
            <div className="col-md-8">
              <div className="text-muted">Dirección</div>
              <div className="fw-semibold">{order.entrega?.direccion}</div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-3 mb-3">
        <h5 className="mb-3">Detalle del pedido</h5>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>Producto</th>
              <th style={{ width: 100 }}>Talla</th>
              <th style={{ width: 120 }}>Cantidad</th>
              <th style={{ width: 140 }}>Precio unitario</th>
              <th style={{ width: 140 }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((l) => (
              <tr key={`${l.id}-${l.talla}`}>
                <td>{l.nombre}</td>
                <td>{l.talla}</td>
                <td>{l.qty}</td>
                <td>{fmtCLP(l.precio)}</td>
                <td>{fmtCLP(l.precio * l.qty)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <div className="d-flex flex-column align-items-end">
        <div className="d-flex justify-content-between" style={{ minWidth: 300 }}>
          <span className="me-4">Subtotal</span>
          <strong>{fmtCLP(order.subtotal)}</strong>
        </div>
        <div className="d-flex justify-content-between" style={{ minWidth: 300 }}>
          <span className="me-4">Envío</span>
          <strong>{fmtCLP(order.envio)}</strong>
        </div>
        <hr style={{ minWidth: 300, width: 300 }} />
        <div className="d-flex justify-content-between fs-5" style={{ minWidth: 300 }}>
          <span className="me-4">Total pagado</span>
          <strong>{fmtCLP(order.total)}</strong>
        </div>
      </div>
    </Container>
  );
}
