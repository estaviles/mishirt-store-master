// src/components/AdminLayout.jsx
import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <Container fluid className="admin-layout p-0">
      <Row className="g-0">
        {/* Sidebar */}
        <Col md={2} className="admin-sidebar">
          <div className="admin-sidebar-title">Panel Admin</div>

          <Nav className="flex-column">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                "nav-link admin-nav-link" + (isActive ? " active" : "")
              }
            >
              <span className="admin-nav-icon">📊</span>
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/admin/productos"
              className={({ isActive }) =>
                "nav-link admin-nav-link" + (isActive ? " active" : "")
              }
            >
              <span className="admin-nav-icon">🛒</span>
              <span>Productos</span>
            </NavLink>

            <NavLink
              to="/admin/reportes"
              className={({ isActive }) =>
                "nav-link admin-nav-link" + (isActive ? " active" : "")
              }
            >
              <span className="admin-nav-icon">📈</span>
              <span>Reportes</span>
            </NavLink>

            <NavLink
              to="/admin/usuarios"
              className={({ isActive }) =>
                "nav-link admin-nav-link" + (isActive ? " active" : "")
              }
            >
              <span className="admin-nav-icon">👥</span>
              <span>Usuarios</span>
            </NavLink>

            {/* Sección extra similar a "Tienda / Perfil" del ejemplo */}
            <div className="admin-sidebar-section">
              <div className="admin-sidebar-section-title">Otros</div>

              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link admin-nav-link" + (isActive ? " active" : "")
                }
              >
                <span className="admin-nav-icon">🛍️</span>
                <span>Tienda</span>
              </NavLink>
            </div>
          </Nav>
        </Col>

        {/* Contenido principal */}
        <Col md={10} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
