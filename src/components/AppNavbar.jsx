// src/components/AppNavbar.jsx
import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Form, Badge } from "react-bootstrap";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AppNavbar({ cartCount = 0 }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const currentQ = new URLSearchParams(location.search).get("q") || "";
  const [term, setTerm] = useState(currentQ);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = term.trim();
    navigate(q ? `/productos?q=${encodeURIComponent(q)}` : "/productos");
  };

  return (
    <Navbar className="navbar-mishirt" expand="md" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">MISHIRT</Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>

            {/* 🔔 Carro con contador */}
            <Nav.Link
              as={NavLink}
              to="/carrito"
              aria-label={cartCount > 0 ? `Carro (${cartCount})` : `Carro`}
              className="d-flex align-items-center"
            >
              Carro
              {cartCount > 0 && (
                <Badge bg="light" text="dark" pill className="ms-2">
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>

          {/* 🔎 Buscador (tema claro solo aquí) */}
          <Form
            className="d-flex me-3 my-2 my-md-0"
            role="search"
            onSubmit={handleSearch}
            data-bs-theme="light"   // 👈 input blanco + placeholder gris
          >
            <Form.Control
              type="search"
              placeholder="Buscar camisetas..."
              className="me-2"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              aria-label="Buscar camisetas"
            />
            <Button size="sm" variant="outline-light" type="submit">Buscar</Button>
          </Form>

          {/* 👤 Sesión */}
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-3">
                  Hola, <strong>{user.nombre}</strong>
                </Navbar.Text>
                <Button size="sm" variant="outline-light" onClick={logout}>
                  Cerrar sesion
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Iniciar sesion</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
