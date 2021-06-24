import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Notfound.css";
function NotFound() {
  return (
    <Container className="wraper-not-found">
      <Row className="text-center">
        <Col className="mt-5">
          <h1 className="error">404</h1>
          <p>Página não encontrada !</p>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
