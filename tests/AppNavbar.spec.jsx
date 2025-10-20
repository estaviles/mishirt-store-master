// tests/AppNavbar.spec.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock base del AuthContext
vi.mock("../src/auth/AuthContext", () => ({
  useAuth: () => ({ user: null, logout: vi.fn() }),
}));

describe("AppNavbar", () => {
  it("muestra enlaces de autenticación cuando no hay usuario", async () => {
    const { MemoryRouter } = await import("react-router-dom");
    const { default: AppNavbar } = await import("../src/components/AppNavBar");

    render(
      <MemoryRouter>
        <AppNavbar />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /iniciar sesion/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /registrarse/i })).toBeInTheDocument();
  });

  it("envía a /productos?q=chile al buscar un término", async () => {
    await vi.resetModules();             // 1) limpiar caché

    const mockNavigate = vi.fn();

    // 2) mockear RRD antes del import
    vi.doMock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({ pathname: "/", search: "" }),
      };
    });

    // 3) re-mockear AuthContext tras resetModules
    vi.doMock("../src/auth/AuthContext", () => ({
      useAuth: () => ({ user: null, logout: vi.fn() }),
    }));

    // 4) importar con mocks activos
    const { MemoryRouter } = await import("react-router-dom");
    const { default: AppNavbar } = await import("../src/components/AppNavBar");

    render(
      <MemoryRouter>
        <AppNavbar />
      </MemoryRouter>
    );

    // El input puede tener role searchbox o textbox según el markup
    const input = screen.queryByRole("searchbox") ?? screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "chile");
    await userEvent.click(screen.getByRole("button", { name: /buscar/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/productos?q=chile");
  });

  it("envía a /productos si el término está vacío", async () => {
    await vi.resetModules();

    const mockNavigate = vi.fn();

    vi.doMock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({ pathname: "/", search: "" }),
      };
    });

    vi.doMock("../src/auth/AuthContext", () => ({
      useAuth: () => ({ user: null, logout: vi.fn() }),
    }));

    const { MemoryRouter } = await import("react-router-dom");
    const { default: AppNavbar } = await import("../src/components/AppNavBar");

    render(
      <MemoryRouter>
        <AppNavbar />
      </MemoryRouter>
    );

    const input = screen.queryByRole("searchbox") ?? screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.click(screen.getByRole("button", { name: /buscar/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/productos");
  });
});
