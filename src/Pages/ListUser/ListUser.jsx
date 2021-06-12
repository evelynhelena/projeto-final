import { Button, Container, ButtonGroup } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect}  from "react";
import { Table, Row, Col } from "react-bootstrap";
import swal from "sweetalert";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
function ListUser() {
  const [users, setUser] = useState([]);
  useEffect(() => {
    axios.get("http://localhost/Compras/usuario/listAll").then(function (response){
        if(response.data.codigo === 1){
            setUser(response.data.data);
            console.log(response.data.data);
        }else{
            swal("Erro", "Ao Pegar os usuários", "error");
        }
    },function(){
        swal("Erro", "Ao enviar ao servidor", "error");
    })
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Senha</th>
                <th>Nome</th>
                <th>Tipo Usuário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
            {users.map((user) => 
                <tr key={user.id_usuario}>
                    <td>{user.usuario}</td>
                    <td>{user.senha}</td>
                    <td>{user.nome}</td>
                    <td>{user.tipo}</td>
                    <td>
                    <ButtonGroup  aria-label="outlined primary button group">
                        <Button color="primary"><EditIcon/></Button>
                        <Button color="secondary"><DeleteIcon/></Button>
                    </ButtonGroup>
                    </td>
                </tr>
            )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default ListUser;