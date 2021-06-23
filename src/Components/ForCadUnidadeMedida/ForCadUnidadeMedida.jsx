import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Form, Row, Card } from "react-bootstrap";
import swal from "sweetalert";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ValidaCampos from "../ValidaCompos/ValidaCampos";
import "../ForCadUnidadeMedida/ForCadUnidadeMedida.css";

function ForCadUnidadeMedida() {
  const [userId, setUserId] = useState("");
  const [siga, setSiga] = useState("");
  const [descricao, setDescricao] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [users, setUsers] = useState([]);

  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  const getUsers = async () => {
    await axios
      .get("http://localhost/Compras/usuario/listAll")
      .then(function (response) {
        console.log(response.data.data);
        setUsers(response.data.data);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  let errorUsuario = false;
  let errorSigla = false;
  let errordescricao = false;

  function resetCampo() {
    setUserId("");
    setSiga("");
    setDescricao("");
    setEnviado(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setEnviado(true);

    const data = {
      usuario: userId,
      sigla: siga,
      descricao: descricao,
    };

    console.log(data);

    errorUsuario = data.usuario.trim().length === 0;
    errorSigla = data.sigla.trim().length === 0;
    errordescricao = data.descricao.trim().length === 0;

    //data.usuario = parseInt(userId);

    if (!errorUsuario && !errorSigla && !errordescricao) {
      if (siga.length > 3) {
        swal("Atenção", "A siga não pode ter mais que 3 caracteres", "warning");
      } else {
        axios
          .post("http://localhost/Compras/UnidMedida/insert", data)
          .then(function (response) {
            if (response.data.codigo === 1) {
              swal(
                "Sucesso",
                "Unidade de medida cadastrada com sucesso",
                "success"
              );
              resetCampo();
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
    <Container className="mt-5">
      <Row className="justify-content">
        <Col md={8}>
          <Card>
            <Card.Header>Cadastro de Unidade de Medida</Card.Header>
            <Card.Body>
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
            </Card.Body>
            <Card.Footer className="text-right">
              <Button
                variant="contained"
                type="submit"
                color="primary"
                onClick={handleSubmit}
              >
                Cadastrar
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForCadUnidadeMedida;
