// src/pages/Checkout.jsx
import React, { useMemo, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const fmtCLP = (v) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 })
    .format(Number(v || 0));

export default function Checkout({ items = [], onClear }) {
  const navigate = useNavigate();

  // agrupamos por id + talla (igual que el carrito)
  const lines = useMemo(() => {
    const map = new Map();
    for (const p of items) {
      const talla = p.talla ?? "-";
      const key = `${p.id}|${talla}`;
      if (!map.has(key)) map.set(key, { ...p, talla, qty: 0 });
      map.get(key).qty += 1;
    }
    return [...map.values()];
  }, [items]);

  const subtotal = useMemo(() => lines.reduce((acc, l) => acc + Number(l.precio) * l.qty, 0), [lines]);

  const [form, setForm] = useState({
    email: "",
    nombre: "",
    phone: "",
    direccion: "",
    entrega: "retiro",  // retiro | domicilio
    pago: "debito",     // debito | credito
  });

  const envio = form.entrega === "domicilio" ? 4990 : 0;
  const total = subtotal + envio;

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // 🔽 Cambiado: guardamos la orden y navegamos a /comprobante
  const onSubmit = (e) => {
    e.preventDefault();
    if (!lines.length) return;

    // ID simple de orden (ej: MS-20251019-123456)
    const now = new Date();
    const orderId = `MS-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
      now.getDate()
    ).padStart(2, "0")}-${String(now.getTime()).slice(-6)}`;

    const order = {
      id: orderId,
      date: now.toISOString(),
      buyer: { email: form.email, nombre: form.nombre, phone: form.phone },
      entrega: { tipo: form.entrega, direccion: form.entrega === "domicilio" ? form.direccion : null },
      pago: form.pago,
      items: lines.map((l) => ({
        id: l.id,
        nombre: l.nombre,
        talla: l.talla,
        qty: l.qty,
        precio: Number(l.precio),
      })),
      subtotal,
      envio,
      total,
    };

    try {
      // último comprobante
      localStorage.setItem("tg_lastOrder", JSON.stringify(order));
      // historial (opcional)
      const histRaw = localStorage.getItem("tg_orders");
      const hist = histRaw ? JSON.parse(histRaw) : [];
      hist.unshift(order);
      localStorage.setItem("tg_orders", JSON.stringify(hist));
    } catch {}

    onClear?.();            // vaciar carrito
    navigate("/comprobante");
  };

  if (!lines.length) {
    return (
      <Container className="py-4">
        <Alert variant="info">Tu carrito está vacío.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-3">
      <h2 className="page-title">Pagar</h2>
      <Row className="g-4">
        {/* --- Formulario --- */}
        <Col lg={7}>
          <Card className="p-3">
            <Form onSubmit={onSubmit}>
              <h5 className="mb-3">Contacto</h5>
              <Row className="g-3">
                <Col md={12}>
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="tucorreo@ejemplo.com"
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Nombre y Apellido</Form.Label>
                  <Form.Control name="nombre" value={form.nombre} onChange={onChange} required />
                </Col>
                <Col md={6}>
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="+56 9 1234 5678"
                    required
                  />
                </Col>
              </Row>

              <hr className="my-4" />
              <h5 className="mb-3">Dirección</h5>
              <Row className="g-3">
                <Col md={12}>
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    name="direccion"
                    value={form.direccion}
                    onChange={onChange}
                    placeholder="Av. Siempre Viva 742"
                    required={form.entrega === "domicilio"}
                  />
                  <Form.Text className="text-muted">
                    Requerida solo si eliges envío a domicilio.
                  </Form.Text>
                </Col>
              </Row>

              <hr className="my-4" />
              <h5 className="mb-3">Opciones de entrega</h5>
              <div className="d-flex gap-3">
                <Form.Check
                  type="radio"
                  id="ent-retiro"
                  label="Retiro en tienda (gratis)"
                  name="entrega"
                  value="retiro"
                  checked={form.entrega === "retiro"}
                  onChange={onChange}
                />
                <Form.Check
                  type="radio"
                  id="ent-domicilio"
                  label="Envío a domicilio ($4.990)"
                  name="entrega"
                  value="domicilio"
                  checked={form.entrega === "domicilio"}
                  onChange={onChange}
                />
              </div>

              <hr className="my-4" />
              <h5 className="mb-3">Método de pago</h5>
              <div className="d-flex gap-3">
                <Form.Check
                  type="radio"
                  id="pago-debito"
                  label="Débito"
                  name="pago"
                  value="debito"
                  checked={form.pago === "debito"}
                  onChange={onChange}
                />
                <Form.Check
                  type="radio"
                  id="pago-credito"
                  label="Crédito"
                  name="pago"
                  value="credito"
                  checked={form.pago === "credito"}
                  onChange={onChange}
                />
              </div>

              <div className="d-grid mt-4">
                <Button type="submit" size="lg">
                  Confirmar y pagar {fmtCLP(total)}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>

        {/* --- Resumen --- */}
        <Col lg={5}>
          <Card className="p-3">
            <h5 className="mb-3">Tu pedido</h5>
            {lines.map((l) => (
              <div
                key={`${l.id}-${l.talla}`}
                className="d-flex justify-content-between align-items-center py-2 border-bottom"
              >
                <div>
                  <div className="fw-semibold">{l.nombre}</div>
                  <div className="small text-muted">Talla: {l.talla} · Cantidad: {l.qty}</div>
                </div>
                <div className="fw-semibold">{fmtCLP(l.precio * l.qty)}</div>
              </div>
            ))}
            <div className="d-flex justify-content-between pt-3">
              <span>Subtotal</span>
              <strong>{fmtCLP(subtotal)}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span>Envío</span>
              <strong>{fmtCLP(envio)}</strong>
            </div>
            <hr />
            <div className="d-flex justify-content-between fs-5">
              <span>Total</span>
              <strong>{fmtCLP(total)}</strong>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
