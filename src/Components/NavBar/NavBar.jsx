import React from "react";
import { Navbar, Nav,NavDropdown} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import "./NavBar.css";
function NavBar() {
  return (  
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>E-Comerce</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown title="Usuário" id="usuario-dropdown">
             <LinkContainer to='/cad_usuario'><NavDropdown.Item>Cadastrar</NavDropdown.Item></LinkContainer>
             <LinkContainer to='/ListUser'><NavDropdown.Item>Listagem</NavDropdown.Item></LinkContainer>
           </NavDropdown>
           <NavDropdown title="Unidade de Medida" id="unidade-dropdown">
             <LinkContainer to='/CadUnidadeMedida'><NavDropdown.Item>Cadastrar</NavDropdown.Item></LinkContainer>
             <LinkContainer to='/ListUnidadeMedida'><NavDropdown.Item>Listagem</NavDropdown.Item></LinkContainer>
          </NavDropdown>
          <LinkContainer to='/'><Nav.Link >Sair</Nav.Link></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default NavBar;
