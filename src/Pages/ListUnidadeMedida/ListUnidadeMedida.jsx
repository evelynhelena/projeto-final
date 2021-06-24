import { Button, Container, ButtonGroup } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect}  from "react";
import { Table, Row, Col } from "react-bootstrap";
import swal from "sweetalert";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ModalUpdateUnidade from "../../Components/ModalUpdateUnidade/ModalUpdateUnidade";
function ListUser() {
  const [unidades, setUnidades] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [unidadeItem, setUnidadeItem] = useState('');

  const unidadeMedida = function(){
    axios.get("http://localhost/Compras/UnidMedida/listAll").then(function (response){
        if(response.data.codigo === 1){
            setUnidades(response.data.data);
        }else{
            swal("Erro", "Ao Pegar os usuários", "error");
        }
    },function(){
        swal("Erro", "Ao enviar ao servidor", "error");
    })
  }

  useEffect(() => {
    unidadeMedida();
  }, []);

  const deleteUniMedida = function(id){
    swal({
      title: "Atenção",
      text: "Deseja excluir este usuário ?",
      icon: "warning",
      buttons: ["Cancelar", "Deletar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.get("http://localhost/Compras/UnidMedida/desativar/" + id).then(function (response){
          if(response.data.codigo === 1){
            swal("Sucesso", "Unidade de medida deletada com sucesso", "success").then(function(){
              unidadeMedida();
            });
          }else{
            swal("Erro", "Erro ao deletar a unidade de medida", "error");
          }
        },function(){
          swal("Erro", "Ao enviar ao servidor", "error");
        })
      }
    });
  }

  const editUnidade = function(unidade){
    setUnidadeItem(unidade);
    setOpenModal(true);
  }

  return (
    <Container className="mt-5">
    {openModal && <ModalUpdateUnidade open={openModal} unidade={unidadeItem}/>}
      <Row>
        <Col>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Sigla</th>
                <th>Usuário</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
            {unidades.map((unidade) => 
                <tr key={unidade.id}>
                    <td>{unidade.id}</td>
                    <td>{unidade.sigla}</td>
                    <td>{unidade.nome}</td>
                    <td>{unidade.descricao}</td>
                    <td>
                    <ButtonGroup  aria-label="outlined primary button group">
                        <Button onClick={() => editUnidade(unidade)} color="primary"><EditIcon/></Button>
                        <Button onClick={() => deleteUniMedida(unidade.id)} color="secondary"><DeleteIcon/></Button>
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
