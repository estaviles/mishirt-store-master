// tests/CardsGrid.spec.jsx
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardsGrid from "../src/components/CardsGrid";

const makeItem = (id) => ({ id, nombre: `Item ${id}`, precio: 1000 * id, img: "/x.png" });

describe("CardsGrid", () => {
  it("renderiza una card por item y sus links 'Ver ...'", () => {
    const items = [makeItem(1), makeItem(2), makeItem(3)];
    render(
      <MemoryRouter>
        <CardsGrid items={items} />
      </MemoryRouter>
    );
    const verLinks = screen.getAllByRole("link", { name: /ver/i });
    expect(verLinks).toHaveLength(3);
  });

  it('propaga el onAdd de una card cuando showCTA es true', async () => {
    const items = [makeItem(1), makeItem(2)];
    const onAdd = vi.fn();
    render(
      <MemoryRouter>
        <CardsGrid items={items} showCTA onAdd={onAdd} />
      </MemoryRouter>
    );
    await userEvent.click(screen.getAllByRole("button", { name: /agregar/i })[0]);
    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });
});
