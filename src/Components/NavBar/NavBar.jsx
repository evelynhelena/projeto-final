import React from "react";
import { Navbar, Nav } from "react-bootstrap";
function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link href="#home">Cadastro de Produto</Nav.Link>
          <Nav.Link href="#cliente">Cadastro de Cliente</Nav.Link>
          <Nav.Link href="#produto">Listagem de Produto</Nav.Link>
          <Nav.Link href="#user">Listagem de Usuários</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
