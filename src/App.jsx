// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import AppNavbar from "./components/AppNavBar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SiteFooter from "./components/SiteFooter";

export default function App() {
  // --- Estado del carrito ---
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito desde localStorage (una sola vez)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("tg_cart");
      if (raw) setCarrito(JSON.parse(raw));
    } catch (_) {
      // si falla el parse, lo ignoramos
    }
  }, []);

  // Persistir carrito en localStorage
  useEffect(() => {
    try {
      localStorage.setItem("tg_cart", JSON.stringify(carrito));
    } catch (_) {}
  }, [carrito]);

  // Acciones del carrito
  const addToCart = (item) => setCarrito((prev) => [...prev, item]);
  const removeFromCart = (index) =>
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  const clearCart = () => setCarrito([]);

  return (
    <AuthProvider>
      <Router>
        {/* Shell para sticky footer */}
        <div className="d-flex flex-column min-vh-100">
          <AppNavbar />

          {/* Contenido principal: crece para empujar el footer abajo */}
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home onAdd={addToCart} />} />
              <Route path="/productos" element={<Productos onAdd={addToCart} />} />
              <Route
                path="/carrito"
                element={
                  <ProtectedRoute>
                    <Carrito
                      items={carrito}
                      onRemove={removeFromCart}
                      onClear={clearCart}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>

          {/* Footer al final */}
          <SiteFooter />
        </div>
      </Router>
    </AuthProvider>
  );
}
