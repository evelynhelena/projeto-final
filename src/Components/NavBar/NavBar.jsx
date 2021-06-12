import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <LinkContainer to='/'><Nav.Link  href="#home">Cadastro de Produto</Nav.Link></LinkContainer>
          <LinkContainer to='/cad_usuario'><Nav.Link to='/cad_usuario'>Cadastro de Usuário</Nav.Link></LinkContainer>
          <LinkContainer to='/ListProduct'><Nav.Link>Listagem de Produto</Nav.Link></LinkContainer>
          <LinkContainer to='/ListUser'><Nav.Link href="#user">Listagem de Usuários</Nav.Link></LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
