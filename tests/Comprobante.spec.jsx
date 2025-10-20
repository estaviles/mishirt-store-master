// tests/Comprobante.spec.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Comprobante from "../src/pages/Comprobante";

describe("Comprobante", () => {
  beforeEach(() => localStorage.clear());

  it("muestra alerta cuando no hay tg_lastOrder", () => {
    render(
      <MemoryRouter>
        <Comprobante />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/no encontramos un comprobante reciente/i)
    ).toBeInTheDocument();
  });

  it("muestra los datos de la orden cuando existe tg_lastOrder", () => {
    const order = {
      id: "MS-20250101-123456",
      date: new Date().toISOString(),
      buyer: { email: "a@b.cl", nombre: "Esteban", phone: "123" },
      entrega: { tipo: "retiro", direccion: null },
      pago: "debito",
      items: [{ id: 1, nombre: "Chile", talla: "M", qty: 2, precio: 10000 }],
      subtotal: 20000,
      envio: 0,
      total: 20000,
    };
    localStorage.setItem("tg_lastOrder", JSON.stringify(order));

    render(
      <MemoryRouter>
        <Comprobante />
      </MemoryRouter>
    );

    expect(screen.getByText(/orden:/i)).toBeInTheDocument();
    expect(screen.getByText(/MS-20250101-123456/)).toBeInTheDocument();
    expect(screen.getByText(/Chile/i)).toBeInTheDocument();
  });
});
