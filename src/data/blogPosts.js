// src/data/blogPosts.js
import coverChile from "../assets/camiseta-chile-blog.jpg";
import coverEspana from "../assets/seleccion_espanola.jpg";

export const BLOG_POSTS = [
  {
    id: 1,
    slug: "nueva-camiseta-seleccion-chilena",
    title: "La nueva camiseta de la selección chilena",
    date: "2024-09-07",
    cover: coverChile,
    excerpt:
      "La Roja estrena una equipación con guiños históricos y materiales de última generación. Te contamos los detalles.",
    body: [
      "La nueva camiseta de la selección chilena ha sido revelada y ha generado un gran debate entre los aficionados. Con un diseño audaz y detalles inspirados en la historia del fútbol del país, esta prenda busca capturar la esencia de la 'Roja'.",
      "El diseño incorpora elementos que rinden homenaje a grandes momentos de la selección, desde la Copa América 2015 hasta el Mundial de 1962. Los materiales de última generación prometen comodidad y rendimiento, ya sea en cancha o en las tribunas.",
    ],
  },
  {
    id: 2,
    slug: "nueva-camiseta-seleccion-españa",
    title: "La nueva camiseta de la seleccion española",
    date: "2024-08-22",
    cover: coverEspana,
    excerpt:
      "Rayas, escudos dorados y telas ligeras: repasamos lo que está marcando la pauta en el diseño.",
    body: [
      "La camiseta de la Selección Española combina tradición y rendimiento: rojo icónico con detalles amarillos, escudo bordado y un tejido ligero y transpirable que acompaña en la cancha o en la calle.",
      "Un clásico de “La Roja” para llevar el orgullo de España en cada partido.",
    ],
  },
];

// Utilitario para formatear fechas en español de Chile
export function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
