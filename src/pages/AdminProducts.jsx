import React, { useState } from 'react'
import { Table, Button, Form, Row, Col } from 'react-bootstrap'
import AdminLayout from '../components/AdminLayout'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ id: '', name: '', price: '', stock: '' })

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()

    const productData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    }

    if (form.id) {
      // Modificar
      setProducts((prev) =>
        prev.map((p) => (p.id === form.id ? productData : p))
      )
    } else {
      // Agregar
      setProducts((prev) => [
        ...prev,
        { ...productData, id: crypto.randomUUID() },
      ])
    }

    setForm({ id: '', name: '', price: '', stock: '' })
  }

  const handleEdit = (product) => setForm(product)

  const handleDelete = (id) =>
    setProducts((prev) => prev.filter((p) => p.id !== id))

  return (
    <AdminLayout>
      <h1 className="mb-4">Productos</h1>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button type="submit" className="w-100">
              {form.id ? 'Actualizar' : 'Agregar'}
            </Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th style={{ width: 170 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">
                No hay productos cargados.
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.stock}</td>
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
