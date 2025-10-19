// src/components/SiteFooter.jsx
import React from "react";
import { Link } from "react-router-dom";

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
                Tienda dedicada a entregar camisetas de selecciones nacionales 
              </p>
            </div>

            <div className="col-md-3">
              <h6 className="mb-2">LINKS</h6>
              <ul className="list-unstyled m-0">
                <li><Link to="/contacto" className="sf-link">Contacto</Link></li>
                <li><Link to="/quienes-somos" className="sf-link">Quienes Somos</Link></li>
                <li><Link to="/blog" className="sf-link">Blog</Link></li>
              </ul>
            </div>

            <div className="col-md-3">
              <h6 className="mb-2">HORARIO DE ATENCIÓN</h6>
              <ul className="list-unstyled m-0">
                <li className="d-flex justify-content-between">
                  <span>Lunes a viernes</span>
                  <time>08:00 – 18:00</time>
                </li>
                <li className="d-flex justify-content-between mt-1">
                  <span>Sábado y domingo</span>
                  <time>08:00 – 14:00</time>
                </li>
              </ul>
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
