import React, { useState,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Form, Row, Col } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ValidaCampos from "../ValidaCompos/ValidaCampos";
import Button from '@material-ui/core/Button';
import swal from "sweetalert";

function ModalUpdateUnidade({ open, unidade }) {
  const [userId, setUserId] = useState(unidade.id_usuario);
  const [siga, setSiga] = useState(unidade.sigla);
  const [descricao, setDescricao] = useState(unidade.descricao);
  const [enviado, setEnviado] = useState(false);
  const [users, setUsers] = useState([]);

  let errorUsuario = false;
  let errorSigla = false;
  let errordescricao = false;

  const getUsers = async () => {
    await axios
      .get("http://localhost/Compras/usuario/listAll")
      .then(function (response) {
        setUsers(response.data.data);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (event) => {
    setUserId(event.target.value);
  };
  const handleClose = () => {
    window.location.reload(true);
  };
  function resetCampo() {
    setUserId("");
    setSiga("");
    setDescricao("");
    setEnviado(false);
    window.location.reload(true);
  }

  const editUnidade = (event) =>{

    event.preventDefault();
    setEnviado(true);

    console.log(unidade.id);

    const data = {
      usuario: parseInt(userId),
      sigla: siga,
      descricao: descricao,
      id: parseInt(unidade.id)

    };

    errorUsuario = data.usuario === 0;
    errorSigla = data.sigla.trim().length === 0;
    errordescricao = data.descricao.trim().length === 0;

    if (!errorUsuario && !errorSigla && !errordescricao) {
      if (siga.length > 3) {
        swal("Atenção", "A siga não pode ter mais que 3 caracteres", "warning");
      } else {
        axios
          .post("http://localhost/Compras/UnidMedida/alterar", data)
          .then(function (response) {
            if (response.data.codigo === 1) {
              swal(
                "Sucesso",
                "Unidade de medida cadastrada com sucesso",
                "success"
              ).then(function(){
                resetCampo();
              });
            } else if (response.data.codigo === 7) {
              swal("Erro", response.data.msg, "error");
            } else {
              swal("Erro", "Erro ao cadastrar a unidade de medida", "error");
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
          <Modal.Title>Editar Unidade de Medida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate autoComplete="off">
            <Row>
              <Col md={6} xs={6}>
                <TextField
                  id="user"
                  className="col-md-12"
                  select
                  label="Usuário"
                  value={userId}
                  onChange={handleChange}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id_usuario} value={user.id_usuario}>
                      {user.nome}
                    </MenuItem>
                  ))}
                </TextField>
                {userId.length === 0 && enviado ? (
                  <ValidaCampos value={"Usuário"}></ValidaCampos>
                ) : (
                  ""
                )}
              </Col>
              <Col md={6} xs={6}>
                <TextField
                  id="siga"
                  className="col-md-12"
                  label="Sigla"
                  autoComplete="current-siga"
                  value={siga}
                  onChange={({ target }) => setSiga(target.value)}
                />
                {siga.length === 0 && enviado ? (
                  <ValidaCampos value={"Senha"}></ValidaCampos>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={12} xs={12}>
                <TextField
                  id="descricao"
                  className="col-md-12"
                  label="Descrição"
                  value={descricao}
                  multiline
                  rows={3}
                  onChange={({ target }) => setDescricao(target.value)}
                />
                {descricao.length === 0 && enviado ? (
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
          <Button variant="contained" color="primary" onClick={editUnidade}>Editar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateUnidade;
