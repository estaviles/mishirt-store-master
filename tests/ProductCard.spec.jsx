// tests/ProductCard.spec.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const base = { id: 1, nombre: "Camiseta Chile", precio: 19990, img: "/x.png" };

describe("ProductCard", () => {
  it("muestra nombre y precio formateado en CLP", async () => {
    const { MemoryRouter } = await import("react-router-dom");
    const { default: ProductCard } = await import("../src/components/ProductCard");

    render(
      <MemoryRouter>
        <ProductCard item={base} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Camiseta Chile/i)).toBeInTheDocument();
    // tolera formato CLP (puntos de miles)
    expect(screen.getByText(/19\.990/)).toBeInTheDocument();
  });

  it('emite onAdd al presionar "Agregar" si NO hay tallas', async () => {
    const { MemoryRouter } = await import("react-router-dom");
    const { default: ProductCard } = await import("../src/components/ProductCard");

    const onAdd = vi.fn();

    render(
      <MemoryRouter>
        <ProductCard item={base} showCTA onAdd={onAdd} />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole("button", { name: /agregar/i }));
    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  it('navega al detalle al presionar "Agregar" si hay tallas', async () => {
    // 1) limpiar caché de módulos para que el mock surta efecto
    await vi.resetModules();

    // 2) preparar mock de navigate
    const mockNavigate = vi.fn();

    // 3) mockear react-router-dom (ANTES de importar)
    vi.doMock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return { ...actual, useNavigate: () => mockNavigate };
    });

    // 4) ahora sí, importar con el mock aplicado
    const { MemoryRouter } = await import("react-router-dom");
    const { default: ProductCard } = await import("../src/components/ProductCard");

    render(
      <MemoryRouter>
        <ProductCard item={{ ...base, tallas: ["S", "M"] }} showCTA />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole("button", { name: /agregar/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/producto/1");
  });
});
