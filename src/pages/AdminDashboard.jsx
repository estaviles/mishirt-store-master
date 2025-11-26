import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import AdminLayout from "../components/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="mb-2">Dashboard</h1>
      <p className="text-muted mb-4">
        Resumen de las actividades diarias del sistema.
      </p>

      <Row className="g-3">
        <Col md={4}>
          <Card className="admin-card">
            <Card.Body>
              <div className="admin-card-header">
                <div>
                  <div className="admin-card-title">Compras</div>
                  <div className="admin-card-number">1.234</div>
                  <div className="admin-card-footer">
                    Probabilidad de aumento: 20%
                  </div>
                </div>
                <div className="admin-card-icon">🛒</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="admin-card">
            <Card.Body>
              <div className="admin-card-header">
                <div>
                  <div className="admin-card-title">Productos</div>
                  <div className="admin-card-number">400</div>
                  <div className="admin-card-footer">
                    Inventario actual: 500
                  </div>
                </div>
                <div className="admin-card-icon">📦</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="admin-card">
            <Card.Body>
              <div className="admin-card-header">
                <div>
                  <div className="admin-card-title">Usuarios</div>
                  <div className="admin-card-number">890</div>
                  <div className="admin-card-footer">
                    Nuevos este mes: 120
                  </div>
                </div>
                <div className="admin-card-icon">👥</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
}
