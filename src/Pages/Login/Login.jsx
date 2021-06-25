import React, { useState } from "react";
import { Col, Container, Form, Row, Card,Image } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import ValidaCampos from "../../Components/ValidaCompos/ValidaCampos";
import Button from "@material-ui/core/Button";
import axios from "axios";
import swal from "sweetalert";
import pride from "../../Img/pride.png";
import bandeira from "../../Img/bandeira.gif";
import { useHistory } from "react-router-dom";
import "./Login.css";
function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [enviado, setEnviado] = useState(false);
  const history = useHistory();

  let errorUsuario = false;
  let errorSenha = false;

  const login = function (event) {
    event.preventDefault();
    setEnviado(true);

    const data = {
      usuario: userName,
      senha: password,
    };
    errorUsuario = data.usuario.trim().length === 0;
    errorSenha = data.senha.trim().length === 0;
    if (!errorUsuario && !errorSenha) {
      axios
        .post("http://localhost/Compras/Login/logar", data)
        .then(function (response) {
          if (response.data.codigo === 1) {
            history.push("/Loading");
            setTimeout(function () {
              history.push("/ListUser");
            }, 3000);
          } else {
            swal("Erro", "Usuário ou senha incorretos", "error");
          }
        });
    }
  };

  return (
    <Container className="mt-5">
      <div>
        <Form noValidate autoComplete="off" className="p-3 form-login">
          <Row className="justify-content-center">
            <Col md={4}>
              <Image className="img_bandeira" src={bandeira}  ></Image>
              <Card className="card-login cards-login-page">
                <Card.Body>
                  <Card.Title className="text-center text-welcome">Bem-Vende</Card.Title>
                  <Row className="mt-2">
                    <Col md={12}>
                      <TextField
                        className="col-md-12"
                        id="user"
                        label="Usuário"
                        value={userName}
                        onChange={({ target }) => setUserName(target.value)}
                      />
                      {userName.length === 0 && enviado ? (
                        <ValidaCampos value={"Usuário"}></ValidaCampos>
                      ) : (
                        ""
                      )}
                    </Col>
                    <Col md={12} className="mt-3">
                      <TextField
                        id="password"
                        className="col-md-12"
                        label="Senha"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                      />
                      {password.length === 0 && enviado ? (
                        <ValidaCampos value={"Senha"}></ValidaCampos>
                      ) : (
                        ""
                      )}
                    <Button
                      className="mt-3 text-center"
                      variant="contained"
                      color="primary"
                      onClick={login}
                    >
                      Entrar
                    </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={8}>
              <Card className="cards-login-page">
                <Card.Body className="text-center">
                <Image className="img_pride" src={pride}></Image>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
