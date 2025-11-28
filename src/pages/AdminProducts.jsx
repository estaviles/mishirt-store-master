import React, { useState } from 'react'
import { Table, Button, Form, Row, Col, Badge } from 'react-bootstrap'
import AdminLayout from '../components/AdminLayout'

const emptyForm = {
  id: null,
  nombre: '',
  descripcion: '',
  precio: '',
  img: '',
  equipo: '',
  categoria: '',
  stock: '',
  tallasText: '',
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCancel = () => setForm(emptyForm)

  const handleSubmit = (e) => {
    e.preventDefault()

    const tallasArray = form.tallasText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const productData = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim() || null,
      precio: Number(form.precio) || 0,
      img: form.img.trim() || null,
      equipo: form.equipo.trim() || null,
      categoria: form.categoria.trim(),
      stock: Number(form.stock) || 0,
      tallas: tallasArray,
      // lógico de activo/inactivo se maneja en el back
      activo: true,
    }

    if (form.id != null) {
      // Editar existente
      setProducts((prev) =>
        prev.map((p) => (p.id === form.id ? { ...p, ...productData } : p))
      )
    } else {
      // Crear nuevo (id temporal solo para la tabla)
      const tempId = Date.now()
      setProducts((prev) => [...prev, { id: tempId, ...productData }])
    }

    setForm(emptyForm)
  }

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      nombre: product.nombre || '',
      descripcion: product.descripcion || '',
      precio: product.precio ?? '',
      img: product.img || '',
      equipo: product.equipo || '',
      categoria: product.categoria || '',
      stock: product.stock ?? '',
      tallasText: (product.tallas || []).join(', '),
    })
  }

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const fmtCLP = (value) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(Number(value || 0))

  return (
    <AdminLayout>
      <h2 className="mb-4">Productos</h2>

      {/* Formulario de alta / edición */}
      <Form
        onSubmit={handleSubmit}
        className="admin-product-form mb-4 shadow-sm bg-white rounded-3 p-3"
      >
        <Row className="g-3">
          <Col md={4}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="precio">
              <Form.Label>Precio (CLP) *</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="1000"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="stock">
              <Form.Label>Stock *</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="1"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="equipo">
              <Form.Label>Equipo</Form.Label>
              <Form.Control
                name="equipo"
                value={form.equipo}
                onChange={handleChange}
                placeholder="Chile, Colo-Colo, Real Madrid..."
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-3 mt-1">
          <Col md={4}>
            <Form.Group controlId="categoria">
              <Form.Label>Categoría *</Form.Label>
              <Form.Control
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                placeholder="América, Europa, Selecciones..."
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="img">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control
                name="img"
                value={form.img}
                onChange={handleChange}
                placeholder="https://... o ruta de la imagen"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="tallasText">
              <Form.Label>Tallas *</Form.Label>
              <Form.Control
                name="tallasText"
                value={form.tallasText}
                onChange={handleChange}
                placeholder="Ej.: S, M, L, XL"
                required
              />
              <Form.Text muted>
                Escribe las tallas separadas por coma.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mt-3" controlId="descripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="mt-3 d-flex gap-2">
          <Button type="submit" variant="primary">
            {form.id ? 'Guardar cambios' : 'Agregar producto'}
          </Button>
          <Button
            type="button"
            variant="outline-secondary"
            onClick={handleCancel}
          >
            Limpiar
          </Button>
        </div>
      </Form>

      {/* Tabla resumen */}
      <Table
        striped
        bordered
        hover
        responsive
        size="sm"
        className="shadow-sm bg-white"
      >
        <thead className="table-light">
          <tr>
            <th>Nombre</th>
            <th>Equipo</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Tallas</th>
            <th>Estado</th>
            <th style={{ width: 180 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center text-muted py-4">
                No hay productos cargados.
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.equipo || '-'}</td>
                <td>{p.categoria}</td>
                <td>{fmtCLP(p.precio)}</td>
                <td>{p.stock}</td>
                <td>{(p.tallas || []).join(', ')}</td>
                <td>
                  <Badge bg={p.activo === false ? 'secondary' : 'success'}>
                    {p.activo === false ? 'Inactivo' : 'Activo'}
                  </Badge>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    className="me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </AdminLayout>
  )
}
