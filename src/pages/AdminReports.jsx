import React from 'react'
import { Table } from 'react-bootstrap'
import AdminLayout from '../components/AdminLayout'

const mockReports = [
  { id: 'BOL-001', date: '2025-11-01', user: 'cliente1', total: 45990, status: 'Pagada' },
  { id: 'BOL-002', date: '2025-11-02', user: 'cliente2', total: 29990, status: 'Anulada' },
]

export default function AdminReports() {
  return (
    <AdminLayout>
      <h1 className="mb-4">Reportes de boletas</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>N° Boleta</th>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {mockReports.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.date}</td>
              <td>{r.user}</td>
              <td>${r.total}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  )
}
