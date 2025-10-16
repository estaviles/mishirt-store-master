import imgARG from "../assets/argentina-local-2024.png";
import imgCHI from "../assets/chile-local-2024.png";
import imgCOL from "../assets/colombia-local-2024.png";

import img4 from "../assets/camiseta4.png";
import img5 from "../assets/camiseta5.png";
import img6 from "../assets/camiseta6.png";

export const products = [
  {
    id: "cl-2024-local",
    nombre: "Camiseta Chile 2024 Local",
    precio: 35000,
    descripcion: "Tela ligera 100%, escudo bordado.",
    categoria: "Chile",
    img: imgCHI,
    destacado: true,
  },
  {
    id: "ar-2024-local",
    nombre: "Camiseta Argentina 2024 Local",
    precio: 42990,
    descripcion: "Versión hincha, 3 estrellas, tejido respirable.",
    categoria: "Argentina",
    img: imgARG,
    destacado: true,
  },
  {
    id: "co-2024-local",
    nombre: "Camiseta Colombia 2024 Local",
    precio: 39990,
    descripcion: "Ajuste clásico, secado rápido.",
    categoria: "Colombia",
    img: imgCOL,
    destacado: true,
  },

  {
    id: "nv-004",
    nombre: "Camiseta Edición 4",
    precio: 32990,
    descripcion: "Tejido respirable, corte regular.",
    categoria: "Otros",
    img: img4,
    destacado: false,
  },
  {
    id: "nv-005",
    nombre: "Camiseta Edición 5",
    precio: 37990,
    descripcion: "Versión hincha, secado rápido.",
    categoria: "Otros",
    img: img5,
    destacado: false,
  },
  {
    id: "nv-006",
    nombre: "Camiseta Edición 6",
    precio: 40990,
    descripcion: "Tela ligera, detalles en contraste.",
    categoria: "Otros",
    img: img6,
    destacado: false,
  },

];

export const categories = ["Todas", "Argentina", "Chile", "Colombia", "Otros"];

