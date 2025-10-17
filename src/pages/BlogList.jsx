// src/pages/BlogList.jsx
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BLOG_POSTS, fmtDate } from "../data/blogPosts";

export default function BlogList() {
  return (
    <section className="blog-page py-4">
      <Container className="text-center mb-4">
        <h1 className="display-6 fw-bold mb-2">Blog</h1>
        <p className="text-muted m-0">
          Aquí encontrarás noticias sobre tus prendas favoritas.
        </p>
      </Container>

      <Container>
        <Row className="g-4">
          {BLOG_POSTS.map((p) => (
            <Col key={p.id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm blog-card">
                {p.cover && (
                  <Card.Img
                    variant="top"
                    src={p.cover}
                    alt={p.title}
                    className="blog-card-cover"
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{p.title}</Card.Title>
                  <div className="text-muted small mb-2">
                    Publicado el {fmtDate(p.date)}
                  </div>
                  <Card.Text className="text-muted mb-3">{p.excerpt}</Card.Text>
                  <div className="mt-auto">
                    <Button as={Link} to={`/blog/${p.slug}`} variant="primary">
                      Leer más
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
