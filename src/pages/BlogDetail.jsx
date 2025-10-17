// src/pages/BlogDetail.jsx
import React, { useMemo } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { BLOG_POSTS, fmtDate } from "../data/blogPosts";

export default function BlogDetail() {
  const { slug } = useParams();

  const post = useMemo(
    () => BLOG_POSTS.find((p) => p.slug === slug),
    [slug]
  );

  if (!post) {
    return (
      <Container className="py-5">
        <h1 className="h4">Artículo no encontrado</h1>
        <p className="text-muted">El post que buscas no existe o fue movido.</p>
        <Button as={Link} to="/blog" variant="primary">
          Volver al Blog
        </Button>
      </Container>
    );
    }

  return (
    <section className="blog-page py-4">
      <Container className="text-center mb-4">
        <h1 className="display-6 fw-bold mb-2">Blog</h1>
        <p className="text-muted m-0">
          Aquí encontrarás noticias sobre tus prendas favoritas.
        </p>
      </Container>

      <Container>
        <article className="blog-article mx-auto mb-5">
          {post.cover && (
            <img src={post.cover} alt={post.title} className="blog-cover" />
          )}

          <h2 className="fw-bold mt-3">{post.title}</h2>
          <div className="blog-date text-muted mb-3">
            Publicado el {fmtDate(post.date)}
          </div>

          {post.body.map((paragraph, i) => (
            <p key={i} className="text-muted">{paragraph}</p>
          ))}

          <div className="mt-4">
            <Button as={Link} to="/blog" variant="outline-primary">
              ← Volver al Blog
            </Button>
          </div>
        </article>
      </Container>
    </section>
  );
}
