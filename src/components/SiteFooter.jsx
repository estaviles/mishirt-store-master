// src/components/SiteFooter.jsx
import React from "react";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer mt-4">
      <div className="site-footer__top">
        <div className="container">
          <div className="row gy-4">
            <div className="col-md-6">
              <h5 className="mb-2">MISHIRT</h5>
              <p className="mb-0">
                Porque no son simples camisetas, son los sueños y esperanzas de un país,
                de una generación entera, de todo un pueblo, autenticidad garantizada para
                poder revivir esos sueños.
              </p>
            </div>

            <div className="col-md-3">
              <h6 className="mb-2">LINKS</h6>
              <ul className="list-unstyled m-0">
                <li><a href="#" className="sf-link">Contacto</a></li>
                <li><a href="#" className="sf-link">Quienes Somos</a></li>
                <li><a href="#" className="sf-link">Blog</a></li>
              </ul>
            </div>

            <div className="col-md-3">
              <h6 className="mb-2">HORARIO DE ATENCIÓN</h6>
              <div className="bg-white p-2">
                <div className="d-flex justify-content-between">
                  <span>Lunes a Viernes:</span><span>8am - 9pm</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Sábado y Domingo:</span><span>8am - 11pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container text-center small">
          © {year} Copyright <strong>MISHirt</strong> (todos los derechos reservados)
          &nbsp;Esteban Aviles / Benjamín Rodríguez: Fullstack 2
        </div>
      </div>
    </footer>
  );
}
