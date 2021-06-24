import React from "react";
import { Navbar, Nav} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
function NavBar() {
  return (  
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>E-Comerce</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <LinkContainer to='/CadUnidadeMedida'><Nav.Link  href="#home">Cadastro de unidade de medida</Nav.Link></LinkContainer>
            <LinkContainer to='/cad_usuario'><Nav.Link to='/cad_usuario'>Cadastro de Usuário</Nav.Link></LinkContainer>
            <LinkContainer to='/ListUnidadeMedida'><Nav.Link>Listagem de unidade de medida</Nav.Link></LinkContainer>
            <LinkContainer to='/ListUser'><Nav.Link href="#user">Listagem de Usuários</Nav.Link></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default NavBar;
