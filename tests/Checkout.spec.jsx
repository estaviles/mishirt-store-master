// tests/Checkout.spec.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const makeItem = (id, precio = 10000, talla = "M", nombre = `Item ${id}`) => ({
  id,
  precio,
  talla,
  nombre,
});

describe("Checkout", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("muestra alerta cuando no hay items", async () => {
    const { MemoryRouter } = await import("react-router-dom");
    const { default: Checkout } = await import("../src/pages/Checkout.jsx"); // extensión para que VS Code no subraye

    render(
      <MemoryRouter>
        <Checkout items={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
  });

  it("guarda tg_lastOrder y tg_orders, vacía el carrito y navega a /comprobante al enviar", async () => {
    await vi.resetModules(); // limpia caché para que el mock surta efecto
    const mockNavigate = vi.fn();

    vi.doMock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return { ...actual, useNavigate: () => mockNavigate };
    });

    const { MemoryRouter } = await import("react-router-dom");
    const { default: Checkout } = await import("../src/pages/Checkout.jsx");

    const onClear = vi.fn();
    const items = [
      makeItem(1, 15000, "M", "Chile"),
      makeItem(1, 15000, "M", "Chile"),
      makeItem(2, 20000, "S", "Argentina"),
    ];

    render(
      <MemoryRouter>
        <Checkout items={items} onClear={onClear} />
      </MemoryRouter>
    );

    // Como los <label> no están asociados, seleccionamos por placeholder / name
    await userEvent.type(screen.getByPlaceholderText(/tucorreo@ejemplo\.com/i), "a@b.cl");
    await userEvent.type(document.querySelector('input[name="nombre"]'), "Esteban");
    await userEvent.type(screen.getByPlaceholderText(/\+56 9/i), "123456");

    // Enviar
    await userEvent.click(screen.getByRole("button", { name: /confirmar y pagar/i }));

    // Efectos en localStorage
    const last = localStorage.getItem("tg_lastOrder");
    expect(last).toBeTruthy();
    const parsed = JSON.parse(last);
    expect(parsed.items.length).toBeGreaterThan(0);

    const hist = JSON.parse(localStorage.getItem("tg_orders"));
    expect(Array.isArray(hist)).toBe(true);
    expect(hist.length).toBeGreaterThan(0);

    // Limpia carrito + navegación
    expect(onClear).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/comprobante");
  });
});
