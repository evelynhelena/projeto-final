import React from "react";
import { Col, Container, Form,Row } from "react-bootstrap";
function Login() {
  return (
    <Container>
        <Row className="justify-content-center">
          <Col md={4}>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Nome de Usuário</Form.Label>
                <Form.Control type="text" placeholder="usuário" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="senha" />
              </Form.Group>
            </Form>
          </Col>
        </Row>
    </Container>
  );
}

export default Login;
