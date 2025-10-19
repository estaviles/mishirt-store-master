import imgARG from "../assets/argentina-local-2024.png";
import imgCHI from "../assets/chile-local-2024.png";
import imgCOL from "../assets/colombia-local-2024.png";
import imgBELG from "../assets/belgica-local-2024-1.jpg";
import imgITL from "../assets/italia-local-2024-1.jpg";
import imgJAP from "../assets/japon-local-2024-1.jpg";
import imgMEX from "../assets/mexico-local-2024-1.jpg";
import imgMRC from "../assets/marruecos-local-2024.png";
import imgVNZ from "../assets/venezuela-local-2024-1.jpg";

export const products = [
  {
  id: "cl-2024",
  nombre: "Camiseta Chile 2024 Local",
  descripcion: "100% tela ligera",
  precio: 29990,
  equipo: "Chile",
  categoria: "America",
  img: imgCHI,
  tallas: ["S", "M", "L", "XL"],
  destacado: true,
  },
  {
    id: "ar-2024",
    nombre: "Camiseta Argentina 2024 Local",
    descripcion: "Versión hincha, 3 estrellas, tejido respirable.",
    precio: 34990,
    equipo: "Argentina",
    categoria: "America",
    img: imgARG,
    tallas: ["S", "M", "L", "XL"],
    destacado: true,
  },
  {
    id: "co-2024",
    nombre: "Camiseta Colombia 2024 Local",
    descripcion: "Ajuste clásico, secado rápido.",
    precio: 34990,
    equipo: "Colombia",
    categoria: "America",
    img: imgCOL,
    tallas: ["S", "M", "L", "XL"],
    destacado: true,
  },

  {
    id: "bg-2024",
    nombre: "Camiseta Belgica 2024 Local",
    descripcion: "Tejido respirable, corte regular.",
    precio: 39990,
    equipo: "Belgica",
    categoria: "Europa",
    img: imgBELG,
    tallas: ["S", "M", "L", "XL"],
    destacado: false,
  },
  {
    id: "it-2024",
    nombre: "Camiseta Italia 2024 Local",
    descripcion: "Versión hincha, secado rápido.",
    precio: 39990,
    equipo: "Italia",
    categoria: "Europa",
    img: imgITL,
    tallas: ["S", "M", "L", "XL"],
    destacado: false,
  },
  {
    id: "jp-2024",
    nombre: "Camiseta Japon 2024 Local",
    precio: 39990,
    descripcion: "Tela ligera, detalles en contraste.",
    equipo: "Japon",
    categoria: "Asia",
    img: imgJAP,
    tallas: ["S", "M", "L", "XL"],
    destacado: false,
  },

  {
    id: "mx-2024",
    nombre: "Camiseta Mexico 2024 Local",
    precio: 34990,
    descripcion: "Tela ligera, detalles en contraste.",
    equipo: "Mexico",
    categoria: "America",
    img: imgMEX,
    tallas: ["S", "M", "L", "XL"],
    destacado: false,
  },

   {
    id: "mr-2024",
    nombre: "Camiseta Marruecos 2024 Local",
    precio: 34990,
    descripcion: "Tela ligera, detalles en contraste.",
    equipo: "Marruecos",
    categoria: "Africa",
    img: imgMRC,
    tallas: ["S", "M", "L", "XL"],
    destacado: false,
  },

  {
    id: "vz-2024",
    nombre: "Camiseta Venezuela 2024 Local",
    precio: 34990,
    descripcion: "Tela ligera, detalles en contraste.",
    equipo: "Venezuela",
    categoria: "America",
    img: imgVNZ,
    tallas: ["S", "M", "L", "XL"],
    destacado: false,
  },

];

export const categories = ["Todas", "America", "Europa", "Asia", "Africa"];

