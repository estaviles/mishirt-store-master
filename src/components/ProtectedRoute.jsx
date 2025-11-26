import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, isAdmin } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && !isAdmin) {
    // Logeado pero no es administrador
    return <Navigate to="/" replace />
  }

  return children
}