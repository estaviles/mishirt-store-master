import imgARG from "../assets/argentina-local-2024.png";
import imgCHI from "../assets/chile-local-2024.png";
import imgCOL from "../assets/colombia-local-2024.png";

import imgBELG from "../assets/belgica-local-2024-1.jpg";
import imgITL from "../assets/italia-local-2024-1.jpg";
import imgJAP from "../assets/japon-local-2024-1.jpg";

import imgMEX from "../assets/mexico-local-2024-1.jpg";

export const products = [
  {
    id: "cl-2024-local",
    nombre: "Camiseta Chile 2024 Local",
    precio: 35000,
    descripcion: "Tela ligera 100%, escudo bordado.",
    categoria: "America",
    img: imgCHI,
    destacado: true,
  },
  {
    id: "ar-2024-local",
    nombre: "Camiseta Argentina 2024 Local",
    precio: 42990,
    descripcion: "Versión hincha, 3 estrellas, tejido respirable.",
    categoria: "America",
    img: imgARG,
    destacado: true,
  },
  {
    id: "co-2024-local",
    nombre: "Camiseta Colombia 2024 Local",
    precio: 39990,
    descripcion: "Ajuste clásico, secado rápido.",
    categoria: "America",
    img: imgCOL,
    destacado: true,
  },

  {
    id: "bg-2024-local",
    nombre: "Camiseta Belgica 2024 Local",
    precio: 32990,
    descripcion: "Tejido respirable, corte regular.",
    categoria: "Europa",
    img: imgBELG,
    destacado: false,
  },
  {
    id: "it-2024-local",
    nombre: "Camiseta Italia 2024 Local",
    precio: 37990,
    descripcion: "Versión hincha, secado rápido.",
    categoria: "Europa",
    img: imgITL,
    destacado: false,
  },
  {
    id: "jp-2024-local",
    nombre: "Camiseta Japon 2024 Local",
    precio: 40990,
    descripcion: "Tela ligera, detalles en contraste.",
    categoria: "Asia",
    img: imgJAP,
    destacado: false,
  },

  {
    id: "mx-2024-local",
    nombre: "Camiseta Mexico 2024 Local",
    precio: 40990,
    descripcion: "Tela ligera, detalles en contraste.",
    categoria: "Asia",
    img: imgMEX,
    destacado: false,
  },

];

export const categories = ["Todas", "America", "Europa", "Asia", "Africa"];

