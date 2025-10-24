// src/pages/Contacto.jsx
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [validated, setValidated] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    if (!formEl.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setSending(true);
    
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ nombre: "", email: "", mensaje: "" });
      setValidated(false);
    }, 500);
  };

  return (
    <div className="contact-page py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="contact-card p-4 p-md-5">
              <h2 className="text-center mb-4">Contáctanos</h2>

              {sent && (
                <Alert
                  variant="success"
                  onClose={() => setSent(false)}
                  dismissible
                >
                  ¡Gracias! Tu mensaje fue enviado correctamente.
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="c-nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={onChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresa tu nombre.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="c-email">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    placeholder="tucorreo@ejemplo.cl"
                    value={form.email}
                    onChange={onChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresa un correo válido.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="c-mensaje">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    name="mensaje"
                    value={form.mensaje}
                    onChange={onChange}
                    rows={5}
                  />
                  <Form.Control.Feedback type="invalid">
                    Escribe tu mensaje.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 btn-brand"
                  disabled={sending}
                >
                  {sending ? "Enviando…" : "Enviar Mensaje"}
                </Button>
              </Form>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
