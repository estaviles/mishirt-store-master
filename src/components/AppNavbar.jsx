import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function AppNavbar(){
    const { user, logout } = useAuth()

    return (
        <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">MISHIRT</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav"/>
                <Navbar.Collapse id="main-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
                        <Nav.Link as={NavLink} to="/carrito">Carrito</Nav.Link>
                    </Nav>
                    <Nav>
                        {user ? (
                            <>
                                <Navbar.Text className="me-3">Hola, <strong>{user.nombre}</strong> </Navbar.Text>
                                <Button size="sm" variant="outline-light" onClick={logout}>Cerrar sesion</Button>
                            </>
                        ):(
                            <>
                                <Nav.Link as={NavLink} to="/login">Iniciar sesion</Nav.Link>
                                <Nav.Link as={NavLink} to="/register">Registrarse</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}