import React, { useState } from 'react'
import { Table, Button, Badge, Row, Col, Form } from 'react-bootstrap'
import AdminLayout from '../components/AdminLayout'

// Mock con el mismo formato que OrderResponse.
// Más adelante solo tendrás que reemplazar esto por los datos
// que vengan del backend (/orders/admin) usando fetch.
const mockOrders = [
  {
    id: 1,
    compradorNombre: 'cliente1',
    compradorEmail: 'cliente1@example.com',
    compradorPhone: '+56 9 1111 1111',
    entregaTipo: 'domicilio',
    entregaDireccion: 'Calle Falsa 123, Viña del Mar',
    metodoPago: 'debito',
    subtotal: 45990,
    envio: 0,
    total: 45990,
    estado: 'PAGADA',
    fechaCreacion: '2025-11-01T10:15:00',
    items: [
      {
        productId: 'cl-2024',
        nombreProducto: 'Camiseta Chile 2024 Local',
        talla: 'M',
        cantidad: 1,
        precioUnitario: 45990,
        subtotal: 45990,
      },
    ],
  },
  {
    id: 2,
    compradorNombre: 'cliente2',
    compradorEmail: 'cliente2@example.com',
    compradorPhone: '+56 9 2222 2222',
    entregaTipo: 'retiro',
    entregaDireccion: null,
    metodoPago: 'credito',
    subtotal: 29990,
    envio: 0,
    total: 29990,
    estado: 'ANULADA',
    fechaCreacion: '2025-11-02T18:20:00',
    items: [
      {
        productId: 'cl-2024',
        nombreProducto: 'Camiseta Chile 2024 Local',
        talla: 'L',
        cantidad: 1,
        precioUnitario: 29990,
        subtotal: 29990,
      },
    ],
  },
]

const fmtCLP = (value) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))

const fmtFecha = (isoString) => {
  if (!isoString) return '-'
  const d = new Date(isoString)
  const dia = d.toLocaleDateString('es-CL')
  const hora = d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })
  return `${dia} ${hora}`
}

const formatOrderNumber = (id) => `BOL-${String(id).padStart(3, '0')}`

export default function AdminReports() {
  const [orders] = useState(mockOrders)
  const [expandedId, setExpandedId] = useState(null)
  const [estadoFilter, setEstadoFilter] = useState('ALL')
  const [emailFilter, setEmailFilter] = useState('')

  const filteredOrders = orders.filter((o) => {
    if (estadoFilter !== 'ALL' && o.estado !== estadoFilter) {
      return false
    }
    if (
      emailFilter &&
      !String(o.compradorEmail || '')
        .toLowerCase()
        .includes(emailFilter.toLowerCase())
    ) {
      return false
    }
    return true
  })

  const toggleExpanded = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  const getEstadoVariant = (estado) => {
    switch (estado) {
      case 'PAGADA':
        return 'success'
      case 'ANULADA':
        return 'danger'
      default:
        return 'secondary'
    }
  }

  const getEstadoLabel = (estado) => {
    switch (estado) {
      case 'PAGADA':
        return 'Pagada'
      case 'ANULADA':
        return 'Anulada'
      default:
        return estado
    }
  }

  const getMetodoPagoLabel = (metodo) => {
    switch (metodo) {
      case 'debito':
        return 'Débito'
      case 'credito':
        return 'Crédito'
      default:
        return metodo
    }
  }

  const getEntregaTipoLabel = (tipo) => {
    switch (tipo) {
      case 'retiro':
        return 'Retiro en tienda'
      case 'domicilio':
        return 'Envío a domicilio'
      default:
        return tipo
    }
  }

  return (
    <AdminLayout>
      <h2 className="mb-2">Reportes de boletas</h2>
      <p className="text-muted mb-3">
        Historial de órdenes generadas en la tienda. Más adelante esta vista se conectará al
        microservicio <code>orders</code>.
      </p>

      {/* Filtros */}
      <Form className="mb-3">
        <Row className="g-2 align-items-end">
          <Col md={3}>
            <Form.Group controlId="estadoFilter">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                value={estadoFilter}
                onChange={(e) => setEstadoFilter(e.target.value)}
              >
                <option value="ALL">Todos</option>
                <option value="PAGADA">Pagadas</option>
                <option value="ANULADA">Anuladas</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="emailFilter">
              <Form.Label>Buscar por email</Form.Label>
              <Form.Control
                type="email"
                placeholder="cliente@correo.com"
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Table
        striped
        bordered
        hover
        size="sm"
        responsive
        className="shadow-sm bg-white"
      >
        <thead className="table-light">
          <tr>
            <th>N° Boleta</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Email</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Método</th>
            <th>Entrega</th>
            <th style={{ width: 140 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center text-muted py-4">
                No hay boletas registradas con los filtros actuales.
              </td>
            </tr>
          ) : (
            filteredOrders.map((o) => (
              <React.Fragment key={o.id}>
                <tr>
                  <td>{formatOrderNumber(o.id)}</td>
                  <td>{fmtFecha(o.fechaCreacion)}</td>
                  <td>{o.compradorNombre}</td>
                  <td className="text-muted small">{o.compradorEmail}</td>
                  <td>{fmtCLP(o.total)}</td>
                  <td>
                    <Badge pill bg={getEstadoVariant(o.estado)}>
                      {getEstadoLabel(o.estado)}
                    </Badge>
                  </td>
                  <td>{getMetodoPagoLabel(o.metodoPago)}</td>
                  <td>{getEntregaTipoLabel(o.entregaTipo)}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => toggleExpanded(o.id)}
                    >
                      {expandedId === o.id ? 'Ocultar detalle' : 'Ver detalle'}
                    </Button>
                  </td>
                </tr>

                {expandedId === o.id && (
                  <tr className="bg-light">
                    <td colSpan={9}>
                      <Row className="mb-3">
                        <Col md={4} className="mb-2">
                          <h6 className="fw-bold mb-2">Datos del cliente</h6>
                          <div className="small">
                            <div>
                              <span className="fw-semibold">Nombre: </span>
                              {o.compradorNombre}
                            </div>
                            <div>
                              <span className="fw-semibold">Email: </span>
                              {o.compradorEmail}
                            </div>
                            {o.compradorPhone && (
                              <div>
                                <span className="fw-semibold">Teléfono: </span>
                                {o.compradorPhone}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col md={4} className="mb-2">
                          <h6 className="fw-bold mb-2">Entrega</h6>
                          <div className="small">
                            <div>{getEntregaTipoLabel(o.entregaTipo)}</div>
                            {o.entregaTipo === 'domicilio' && o.entregaDireccion && (
                              <div>
                                <span className="fw-semibold">Dirección: </span>
                                {o.entregaDireccion}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col md={4} className="mb-2">
                          <h6 className="fw-bold mb-2">Resumen</h6>
                          <div className="small">
                            <div>
                              <span className="fw-semibold">Subtotal: </span>
                              {fmtCLP(o.subtotal)}
                            </div>
                            <div>
                              <span className="fw-semibold">Envío: </span>
                              {fmtCLP(o.envio)}
                            </div>
                            <div>
                              <span className="fw-semibold">Total: </span>
                              {fmtCLP(o.total)}
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <h6 className="fw-bold">Productos</h6>
                      <Table size="sm" bordered className="bg-white">
                        <thead className="table-light">
                          <tr>
                            <th>Producto</th>
                            <th>Talla</th>
                            <th>Cantidad</th>
                            <th>Precio unitario</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(o.items || []).map((item, idx) => (
                            <tr key={idx}>
                              <td>{item.nombreProducto}</td>
                              <td>{item.talla || '-'}</td>
                              <td>{item.cantidad}</td>
                              <td>{fmtCLP(item.precioUnitario)}</td>
                              <td>{fmtCLP(item.subtotal)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </Table>
    </AdminLayout>
  )
}
