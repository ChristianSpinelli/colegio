import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


export default function Header(props){
	return(
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand href="/home">Sistema de alunos</Navbar.Brand>
			<Nav>
				<Nav.Link href="/Cadastro">Cadastro</Nav.Link>
				<Nav.Link href="/operations">Operações</Nav.Link>
			</Nav>
		</Navbar>
		);
}