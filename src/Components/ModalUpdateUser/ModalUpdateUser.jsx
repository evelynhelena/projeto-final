import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Form, Row, Col } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import ValidaCampos from "../ValidaCompos/ValidaCampos";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
function ModalUpdateUser({ open, user }) {
  const [userName, setUserName] = useState(user.usuario);
  const [password, setPassword] = useState(user.senha);
  const [confirmPassword, setConfirmPassword] = useState(user.senha);
  const [name, setName] = useState(user.nome);
  const [typeUser, setTypeUser] = useState(user.tipo);
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

  console.log(user);
  const handleClose = () => {
    window.location.reload(true);
  };


  function editUser(event) {
    event.preventDefault();
    setEnviado(true);

    const data = {
      usuario: userName,
      senha: password,
      nome: name,
      tipo_usuario: typeUser.toUpperCase(),
      id: parseInt(user.id_usuario)
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
          .post("http://localhost/Compras/usuario/alterar", data)
          .then(function (response) {
            if (response.data.codigo === 1) {
              swal("Sucesso", "Usuário alterado com sucesso", "success");
              resetCampo();
            } else {
              swal("Erro", "Erro ao alterar o usuário", "error");
            }
          });
      }
    }

  }

  return (
    <>
      <Modal
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                {userName.length === 0 && enviado ? (
                  <ValidaCampos value={"Usuário"}></ValidaCampos>
                ) : (
                  ""
                )}
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
                {password.length === 0 && enviado ? (
                  <ValidaCampos value={"Senha"}></ValidaCampos>
                ) : (
                  ""
                )}
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
                {confirmPassword.length === 0 && enviado ? (
                  <ValidaCampos value={"Confirmação de Senha"}></ValidaCampos>
                ) : (
                  ""
                )}
              </Col>
              <Col md={6} xs={6}>
                <TextField
                  id="name"
                  className="col-md-12"
                  label="Nome"
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
                {name.length === 0 && enviado ? (
                  <ValidaCampos value={"Nome"}></ValidaCampos>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={12} xs={12}>
                <TextField
                  id="typeUser"
                  className="col-md-12"
                  label="Tipo de usuario"
                  value={typeUser}
                  onChange={({ target }) => setTypeUser(target.value)}
                />
                {typeUser.length === 0 && enviado ? (
                  <ValidaCampos value={"Tipo de Usuário"}></ValidaCampos>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="mr-2" variant="contained" onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={editUser}>Editar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateUser;
