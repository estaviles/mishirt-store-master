import React, { useMemo } from "react";
import { Container, Table, Button, Alert, ButtonGroup } from "react-bootstrap";

const fmtCLP = (v) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(v || 0));

export default function Carrito({ items, onInc, onDec, onRemoveGroup, onClear }) {
  // Agrupamos por id + talla
  const rows = useMemo(() => {
    const map = new Map();
    for (const p of items) {
      const tallaKey = p.talla ?? "-";
      const key = `${p.id}|${tallaKey}`;
      if (!map.has(key)) {
        map.set(key, {
          id: p.id,
          nombre: p.nombre,
          talla: tallaKey,
          precio: Number(p.precio) || 0,
          qty: 0,
          // guardamos un “template” del producto para poder sumar con +
          template: p,
        });
      }
      map.get(key).qty += 1;
    }
    return Array.from(map.values());
  }, [items]);

  const total = useMemo(
    () => rows.reduce((acc, r) => acc + r.precio * r.qty, 0),
    [rows]
  );

  if (rows.length === 0) {
    return (
      <Container>
        <h2 className="page-title">Carrito</h2>
        <Alert variant="info">Tu carrito está vacío</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="page-title">Carrito</h2>

      <Table hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Talla</th>
            <th className="text-center">Cantidad</th>
            <th>Precio unit.</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.id}-${r.talla}`}>
              <td>{i + 1}</td>
              <td>{r.nombre}</td>
              <td>{r.talla}</td>
              <td className="text-center">
                <ButtonGroup size="sm" aria-label="Cantidad">
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      r.qty > 1
                        ? onDec({ id: r.id, talla: r.talla })
                        : onRemoveGroup({ id: r.id, talla: r.talla })
                    }
                    title={r.qty > 1 ? "Restar 1" : "Eliminar línea"}
                  >
                    –
                  </Button>
                  <Button variant="light" disabled>
                    {r.qty}
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => onInc(r.template)}
                    title="Sumar 1"
                  >
                    +
                  </Button>
                </ButtonGroup>
              </td>
              <td>{fmtCLP(r.precio)}</td>
              <td>{fmtCLP(r.precio * r.qty)}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => onRemoveGroup({ id: r.id, talla: r.talla })}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center">
        <h5>Total: {fmtCLP(total)}</h5>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={onClear}>
            Vaciar
          </Button>
          <Button>Finalizar compra</Button>
        </div>
      </div>
    </Container>
  );
}
