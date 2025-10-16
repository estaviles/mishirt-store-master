import React from "react";
import { Container } from "react-bootstrap";

export default function QuienesSomos() {
  return (
    <section className="about-page py-5">
      <Container className="about-max">
        <header className="text-center mb-4">
          <h2 className="fw-bold text-uppercase mb-2">Quiénes Somos</h2>
          <p className="text-muted mb-0">
            Equipamos tu pasión. Somos los especialistas en fútbol de Chile.
          </p>
        </header>

        <div className="about-body mx-auto">
          <article className="mb-4">
            <h6 className="fw-bold mb-1">Nuestra Misión</h6>
            <p className="mb-0">
              Queremos inspirar y compartir nuestra pasión por el fútbol con las nuevas
              generaciones. Ofrecemos una experiencia de compra excepcional y una
              asesoría de calidad, para que cada cliente se sienta como un verdadero experto.
            </p>
          </article>

          <article className="mb-4">
            <h6 className="fw-bold mb-1">Nuestra Visión</h6>
            <p className="mb-0">
              Buscamos ser reconocidos como la autoridad indiscutible en el mercado del
              fútbol. A través de la mejora continua y la fidelización de nuestros clientes,
              queremos consolidarnos como la marca de confianza que genera valor para todos.
            </p>
          </article>

          <article className="mb-4">
            <h6 className="fw-bold mb-1">Nuestro Objetivo</h6>
            <p className="mb-0">
              Convertirnos en el principal referente del fútbol en Chile, destacando tanto
              en la relación con nuestros clientes como en ventas. Queremos ser la primera
              opción para cualquier amante de este deporte.
            </p>
          </article>

          <hr className="about-divider" />
        </div>
      </Container>
    </section>
  );
}
