import React from 'react';
import Navbar from 'react-bootstrap/Navbar';


export default function Header(){
	return(
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand href='/home'>Sistema de alunos</Navbar.Brand>
		</Navbar>
		);
}