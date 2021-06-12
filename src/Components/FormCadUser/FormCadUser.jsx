import React, { useState } from "react";
import axios from "axios";
import { Col, Container, Form, Row, Card, Image } from "react-bootstrap";
import swal from "sweetalert";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import "../FormCadUser/FormCadUser.css";
import avtar1 from "../../Img/avatar_1.png";
import ValidaCampos from "../ValidaCompos/ValidaCampos";
function FormCadUser() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [typeUser, setTypeUser] = useState("");
  const [enviado, setEnviado] = useState(false);

  let errorUsuario = false;
  let errorSenha = false;
  let errorNome = false;
  let errorTypeUser = false;
  let errorConfirmPassword = false;

  function resetCampo() {
    setUserName("");
    setPassword("");
    setName("");
    setTypeUser("");
    setConfirmPassword("");
    setEnviado(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setEnviado(true);

    const data = {
      usuario: userName,
      senha: password,
      nome: name,
      tipo_usuario: typeUser,
    };


    errorUsuario = data.usuario.trim().length === 0;
    errorSenha = data.senha.trim().length === 0;
    errorNome = data.nome.trim().length === 0;
    errorTypeUser = data.tipo_usuario.trim().length === 0;
    errorConfirmPassword = confirmPassword.trim().length === 0;

    if (!errorUsuario && !errorSenha && !errorNome && !errorTypeUser && !errorConfirmPassword) {
      if (password !== confirmPassword) {
        swal("Erro", "As Senhas não conferem", "error");
      } else if (password.length > 10) {
        swal("Atenção", "As Senhas devem conter no maximo 10 Caracteres", "warning");
      } else if(typeUser.toUpperCase() !== "ADMNISTRADOR" && typeUser.toUpperCase() !== "COMUM"){
        swal("Erro", "Tipo de usuário inválido", "error");
      }else {
        axios
          .post("http://localhost/Compras/usuario/insert", data)
          .then(function (response) {
            if (response.data.codigo === 1) {
              swal("Sucesso", "Usuário cadastrado com sucesso", "success");
              resetCampo();
            } else {
              swal("Erro", "Erro ao cadastrar o usuário", "error");
            }
          });
      }
    }

  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} xs={8}>
          <Card>
            <Card.Header>Cadastro de Usuarios</Card.Header>
            <Card.Body>
              <Form noValidate autoComplete="off">
                <Row>
                  <Col md={6} xs={6}>
                    <TextField
                      className="col-md-12"
                      id="user"
                      label="Usuário"
                      value={userName}
                      onChange={({ target }) => setUserName(target.value)}
                    />
                    {userName.length === 0 && enviado ? <ValidaCampos value={'Usuário'}></ValidaCampos> : ''}
                  </Col>
                  <Col md={6} xs={6}>
                    <TextField
                      id="password"
                      className="col-md-12"
                      label="Senha"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={({ target }) => setPassword(target.value)}
                    />
                    {password.length === 0 && enviado ? <ValidaCampos value={'Senha'}></ValidaCampos> : ''}
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={6} xs={6}>
                    <TextField
                      id="passwordConfirm"
                      className="col-md-12"
                      label="Confirme a Senha"
                      type="password"
                      autoComplete="current-password"
                      value={confirmPassword}
                      onChange={({ target }) => setConfirmPassword(target.value)}
                    />
                    {confirmPassword.length === 0 && enviado ? <ValidaCampos value={'Confirmação de Senha'}></ValidaCampos> : ''}
                  </Col>
                  <Col md={6} xs={6}>
                    <TextField
                      id="name"
                      className="col-md-12"
                      label="Nome"
                      value={name}
                      onChange={({ target }) => setName(target.value)}
                    />
                    {name.length === 0 && enviado ? <ValidaCampos value={'Nome'}></ValidaCampos> : ''}
                  </Col>
                </Row>
                <Row className="mt-3">    
                  <Col md={6} xs={6}>
                      <TextField
                        id="typeUser"
                        className="col-md-12"
                        label="Tipo de usuario"
                        value={typeUser}
                        onChange={({ target }) => setTypeUser(target.value)}
                      />
                      {typeUser.length === 0 && enviado ? <ValidaCampos value={'Tipo de Usuário'}></ValidaCampos> : ''}
                  </Col>
                </Row>
              </Form>
            </Card.Body>
            <Card.Footer className="text-right">
              <Button variant="contained" type="submit" color="primary" onClick={handleSubmit}>Cadastrar</Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={4} xs={4}>
          <Card>
            <Card.Body className="text-center">
              <Image className="img_avatar" src={avtar1} roundedCircle ></Image>
              <Card.Title className="mt-3">{userName === "" ? "Usuário" : userName}</Card.Title>
              <Card.Text>
                {name === "" ? "Nome Completo" : name}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center p-2">
              <input
                accept="image/*"
                className="input-file mb-0"
                id="contained-button-file"
                multiple
                type="file"
              />
              <label className="label-upload" htmlFor="contained-button-file">
                <Button className="btn-upload" variant="outlined" component="span" color="primary">Upload Foto</Button>
              </label>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FormCadUser;
