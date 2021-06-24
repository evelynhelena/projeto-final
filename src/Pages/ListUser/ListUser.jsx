import { Button, Container, ButtonGroup } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect}  from "react";
import { Table, Row, Col } from "react-bootstrap";
import swal from "sweetalert";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ModalUpdateUser from "../../Components/ModalUpdateUser/ModalUpdateUser";
function ListUser() {
  const [users, setUser] = useState([]);
  const [userItem, setUserItem] = useState();
  const [openModal, setOpenModal] = useState();
  const getUser = function (){
      axios.get("http://localhost/Compras/usuario/listAll").then(function (response){
        if(response.data.codigo === 1){
            setUser(response.data.data);
        }else{
            swal("Erro", "Ao Pegar os usuários", "error");
        }
    },function(){
        swal("Erro", "Ao enviar ao servidor", "error");
    });
  }
  useEffect(() => {
    getUser();
  }, []);

  const deleteUser = function(id){
    swal({
      title: "Atenção",
      text: "Deseja excluir este usuário ?",
      icon: "warning",
      buttons: ["Cancelar", "Deletar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.get("http://localhost/Compras/usuario/desativar/" + id).then(function (response){
          if(response.data.codigo === 1){
            swal("Sucesso", "Usiário deletado com sucesso", "success").then(function(){
              getUser();
            });
          }else{
            swal("Erro", "Erro ao deletar o usuário", "error");
          }
        },function(){
          swal("Erro", "Ao enviar ao servidor", "error");
        })
      }
    });
  }

  const editUser = function(unidade){
    setUserItem(unidade);
    setOpenModal(true);
  }

  return (
    <Container className="mt-5">
     {openModal && <ModalUpdateUser open={openModal} user={userItem}/>}
      <Row>
        <Col>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>ID</th>
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
                    <td>{user.id_usuario}</td>
                    <td>{user.usuario}</td>
                    <td>{user.senha}</td>
                    <td>{user.nome}</td>
                    <td>{user.tipo}</td>
                    <td>
                    <ButtonGroup  aria-label="outlined primary button group">
                        <Button color="primary"onClick={() => editUser(user)}><EditIcon/></Button>
                        <Button onClick={() => deleteUser(user.id_usuario)} color="secondary"><DeleteIcon/></Button>
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
