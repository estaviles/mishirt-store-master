// src/auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

const USERS_KEY = 'tg_users'   // lista de usuarios registrados
const SESSION_KEY = 'tg_session' // usuario logeado actual

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Cargar sesión persistida
  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY)
    if (raw) {
      const stored = JSON.parse(raw)
      // Si una sesión antigua no tiene role, lo dejamos como USER
      setUser(stored.role ? stored : { ...stored, role: 'USER' })
    }
  }, [])

  const getUsers = () => {
    const raw = localStorage.getItem(USERS_KEY)
    let users = raw ? JSON.parse(raw) : []

    // Semilla de un usuario administrador de ejemplo, si no existe ninguno
    const hasAdmin = users.some((u) => u.role === 'ADMIN')
    if (!hasAdmin) {
      const adminUser = {
        id: 'admin-id',
        nombre: 'Admin',
        apellido: 'Principal',
        username: 'admin',
        password: 'admin123',
        role: 'ADMIN',
      }
      users.push(adminUser)
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
    }

    return users
  }

  const saveUsers = (list) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(list))
  }

  const register = ({ nombre, apellido, username, password }) => {
    const users = getUsers()
    const exists = users.some(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    )
    if (exists) {
      throw new Error('El nombre de usuario ya está en uso')
    }

    const newUser = {
      id: crypto.randomUUID(),
      nombre,
      apellido,
      username,
      password,
      role: 'USER', // todos los registrados desde la web son usuarios normales
    }

    users.push(newUser)
    saveUsers(users)

    return {
      id: newUser.id,
      nombre: newUser.nombre,
      apellido: newUser.apellido,
      username: newUser.username,
      role: newUser.role,
    }
  }

  const login = ({ username, password }) => {
    const users = getUsers()
    const match = users.find(
      (u) => u.username === username && u.password === password
    )
    if (!match) {
      throw new Error('Usuario o contraseña inválidos')
    }

    const sessionUser = {
      id: match.id,
      nombre: match.nombre,
      apellido: match.apellido,
      username: match.username,
      role: match.role || 'USER',
    }

    setUser(sessionUser)
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
    return sessionUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
  }

  const value = {
    user,
    register,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}