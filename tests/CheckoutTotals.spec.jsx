import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Checkout from "../src/pages/Checkout.jsx";

const item = (id, precio, talla = "M", nombre = `Item ${id}`) => ({ id, precio, talla, nombre });

describe("Checkout - cálculo de totales", () => {
  it("subtotal con retiro (envío 0) y luego domicilio (+$4.990)", async () => {
    // 2 x 15.000 + 1 x 20.000 = 50.000
    const items = [item(1, 15000), item(1, 15000), item(2, 20000)];

    render(
      <MemoryRouter>
        <Checkout items={items} />
      </MemoryRouter>
    );

    // Fila Subtotal
    const subtotalLabel = screen.getByText(/^subtotal$/i);
    const subtotalValue = subtotalLabel.nextElementSibling;
    expect(subtotalValue).toHaveTextContent(/50\.000/);

    // Fila Envío (¡ojo con acento!)
    const envioLabel = screen.getByText(/^env[ií]o$/i);
    const envioValue = envioLabel.nextElementSibling;
    expect(envioValue).toHaveTextContent(/0/);

    // Fila Total
    const totalLabel = screen.getByText(/^total$/i);
    const totalValue = totalLabel.nextElementSibling;
    expect(totalValue).toHaveTextContent(/50\.000/);

    // Cambiar a "Envío a domicilio ($4.990)"
    await userEvent.click(screen.getByLabelText(/env[ií]o a domicilio/i));

    // Envío 4.990 y Total 54.990
    expect(envioLabel.nextElementSibling).toHaveTextContent(/4\.990/);
    expect(totalLabel.nextElementSibling).toHaveTextContent(/54\.990/);
  });
});
