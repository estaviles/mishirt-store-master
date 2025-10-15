import React from 'react'
import { Container, Row, Col, Card, CardFooter } from 'react-bootstrap'
import HeroCarousel from '../components/HeroCarousel';

import imgChile from "../assets/seleccion_chilena.jpg"
import imgEsp from "../assets/seleccion_espanola.jpg"
import imgArg from "../assets/seleccion_argentina.jpg"



export default function Home(){
    const slides = [
    {
        src: imgChile,
        title: "SELECCIÓN CHILENA",
    },
    {
        src: imgEsp,
        title: "SELECCIÓN ESPAÑOLA",
    },
    {
        src: imgArg,
        title: "SELECCIÓN ARGENTINA",
    },
    ];



    return (
        <Container className="mb-4">
        <Row className="mb-4">
            <Col>
            <HeroCarousel slides={slides} />
            </Col>
        </Row>


        {/* aquí puedes seguir con tus cards/listado de productos */}
        </Container>
    );
}