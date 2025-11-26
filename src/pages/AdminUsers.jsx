import React from 'react'
import { Table } from 'react-bootstrap'
import AdminLayout from '../components/AdminLayout'

const mockUsers = [
  { id: 1, name: 'Cliente Uno', email: 'cliente1@mishirt.cl', orders: 5, lastOrder: '2025-10-20' },
  { id: 2, name: 'Cliente Dos', email: 'cliente2@mishirt.cl', orders: 2, lastOrder: '2025-11-02' },
]

export default function AdminUsers() {
  return (
    <AdminLayout>
      <h1 className="mb-4">Usuarios</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>N° compras</th>
            <th>Última compra</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.orders}</td>
              <td>{u.lastOrder}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  )
}
