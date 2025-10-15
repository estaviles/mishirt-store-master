import React from 'react'
import { Container, Row, Col, Card, CardFooter } from 'react-bootstrap'


export default function Home(){
    return(
        <Container>
            <Row className="mb-4">
                <Col>
                    <h1 className="page-title">Bienvenido a MISHirt</h1>
                    <p className="muted">Camisetas de futbol</p> 
                </Col>
            </Row>
        </Container>
    )
}