import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";

describe("ProductDetail", () => {
  it("con tallas: deshabilita hasta elegir talla y llama onAdd con esa talla", async () => {
    // Usamos un ID real de tu Products.js: "cl-2024" (tiene tallas)
    const onAdd = vi.fn();

    const { default: ProductDetail } = await import("../src/pages/ProductDetail.jsx");

    render(
      <MemoryRouter initialEntries={["/producto/cl-2024"]}>
        <Routes>
          <Route path="/producto/:id" element={<ProductDetail onAdd={onAdd} />} />
        </Routes>
      </MemoryRouter>
    );

    const btn = screen.getByRole("button", { name: /añadir al carrito/i });
    expect(btn).toBeDisabled();

    // Elegir talla M
    await userEvent.click(screen.getByRole("button", { name: /^m$/i }));
    expect(btn).toBeEnabled();

    // Agregar
    await userEvent.click(btn);
    expect(onAdd).toHaveBeenCalled();
    const arg = onAdd.mock.calls[0][0];
    expect(arg).toEqual(expect.objectContaining({ id: "cl-2024", talla: "M" }));
  });

  it("sin tallas: botón habilitado y onAdd recibe talla null", async () => {
    await vi.resetModules();

    // Mockeamos el módulo de productos para exponer un producto SIN tallas
    vi.doMock("../src/data/Products", () => ({
      products: [
        { id: "no-tallas-1", nombre: "Camiseta Genérica", precio: 9990, tallas: [] },
      ],
    }));

    const onAdd = vi.fn();
    const { default: ProductDetail } = await import("../src/pages/ProductDetail.jsx");

    render(
      <MemoryRouter initialEntries={["/producto/no-tallas-1"]}>
        <Routes>
          <Route path="/producto/:id" element={<ProductDetail onAdd={onAdd} />} />
        </Routes>
      </MemoryRouter>
    );

    const btn = screen.getByRole("button", { name: /añadir al carrito/i });
    expect(btn).toBeEnabled();

    await userEvent.click(btn);
    expect(onAdd).toHaveBeenCalled();
    const arg = onAdd.mock.calls[0][0];
    expect(arg).toEqual(expect.objectContaining({ id: "no-tallas-1", talla: null }));
  });
});
