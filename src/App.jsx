// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // 👈 añadí Navigate

import { AuthProvider } from "./auth/AuthContext";
import AppNavbar from "./components/AppNavBar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SiteFooter from "./components/SiteFooter";
import QuienesSomos from "./pages/QuienesSomos";
import ProductDetail from "./pages/ProductDetail";

import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";

// (si tienes Blog, déjalo igual)

export default function App() {
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito
  useEffect(() => {
    try {
      const raw = localStorage.getItem("tg_cart");
      if (raw) setCarrito(JSON.parse(raw));
    } catch {}
  }, []);

  // Guardar carrito
  useEffect(() => {
    try {
      localStorage.setItem("tg_cart", JSON.stringify(carrito));
    } catch {}
  }, [carrito]);

  // === Acciones ===
  const addToCart = (item) => setCarrito((prev) => [...prev, item]);

  const decrementLine = ({ id, talla }) =>
    setCarrito((prev) => {
      const idx = prev.findIndex(
        (p) => p.id === id && (p.talla ?? "-") === (talla ?? "-")
      );
      if (idx === -1) return prev;
      const next = prev.slice();
      next.splice(idx, 1);
      return next;
    });

  const removeLine = ({ id, talla }) =>
    setCarrito((prev) =>
      prev.filter(
        (p) => !(p.id === id && (p.talla ?? "-") === (talla ?? "-"))
      )
    );

  const clearCart = () => setCarrito([]);

  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <AppNavbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home onAdd={addToCart} />} />
              <Route path="/productos" element={<Productos onAdd={addToCart} />} />
              <Route path="/producto/:id" element={<ProductDetail onAdd={addToCart} />} />

              {/* === PASO 2: BLOG === */}
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />

              {/* === PASO 3: CONTACTO (simple) === */}
              <Route
                path="/contacto"
                element={
                  <div className="container py-4">
                    <h2>Contacto</h2>
                    <p>Escríbenos a contacto@mishirt.cl</p>
                  </div>
                }
              />

              {/* Carrito protegido */}
              <Route
                path="/carrito"
                element={
                  <ProtectedRoute>
                    <Carrito
                      items={carrito}
                      onInc={addToCart}           // +
                      onDec={decrementLine}      // –
                      onRemoveGroup={removeLine} // Eliminar línea
                      onClear={clearCart}
                    />
                  </ProtectedRoute>
                }
              />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/quienes-somos" element={<QuienesSomos />} />

              {/* === PASO 4: comodín === */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <SiteFooter />
        </div>
      </Router>
    </AuthProvider>
  );
}
