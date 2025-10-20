// tests/ProtectedRoute.spec.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

// 1) MOCK DEL CONTEXTO (ANTES DE IMPORTAR EL COMPONENTE)
const mockAuth = { user: null, logout: vi.fn(), login: vi.fn() };

vi.mock("../src/auth/AuthContext", () => ({
  // devolvemos SIEMPRE el mismo objeto mutable para poder cambiarlo por test
  useAuth: () => mockAuth,
}));

// 2) IMPORT DEL COMPONENTE (DESPUÉS DEL MOCK)
import ProtectedRoute from "../src/components/ProtectedRoute";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    mockAuth.user = null; // por defecto sin usuario
  });

  it("redirige a /login cuando no hay usuario", () => {
    render(
      <MemoryRouter initialEntries={["/comprobante"]}>
        <Routes>
          <Route
            path="/comprobante"
            element={
              <ProtectedRoute>
                <div>Privado</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  it("renderiza el contenido cuando hay usuario", () => {
    mockAuth.user = { id: "1", email: "test@demo.cl" }; // ← autenticado

    render(
      <MemoryRouter initialEntries={["/comprobante"]}>
        <Routes>
          <Route
            path="/comprobante"
            element={
              <ProtectedRoute>
                <div>Privado</div>
              </ProtectedRoute>
            }
          />
          {/* agregamos /login igual, por si el componente intentara navegar */}
          <Route path="/login" element={<div>Login page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/privado/i)).toBeInTheDocument();
  });
});
