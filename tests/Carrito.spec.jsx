// tests/Carrito.spec.jsx  (reemplaza solo el último test por este bloque completo)
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Carrito from "../src/pages/Carrito";

const item = (id, talla, precio = 10000, nombre = `Item ${id}`) => ({
  id,
  talla,
  precio,
  nombre,
});

it("tiene CTA para ir a Checkout (botón o enlace)", () => {
  render(
    <MemoryRouter>
      <Carrito items={[item(1, "M")]} />
    </MemoryRouter>
  );

  // Detecta link o botón, y como fallback un aria-label
  const cta =
    screen.queryByRole("link", { name: /finalizar compra|ir a pagar/i }) ||
    screen.queryByRole("button", { name: /finalizar compra|ir a pagar/i }) ||
    screen.queryByLabelText(/ir a pagar/i);

  expect(cta).toBeTruthy(); // existe CTA

  // Si es <a>, valida que apunte a /checkout
  if (cta && typeof cta.getAttribute === "function") {
    const href = cta.getAttribute("href");
    if (href) expect(href).toContain("/checkout");
  }
});
