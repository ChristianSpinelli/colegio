import React from "react";
import Header from '../Components/header';
import Banner from '../Components/banner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import "./telas.css";


export default class Cadastro extends React.Component{
	render(){
		return(
				<React.Fragment>
					<section class='header'>	
						<Header/>
					</section>

					<section class='content'>
							<Container>
								
								<Row>
									<div class='col'>
										<Col><Banner image='./students grande.jpg' title='Cadastro de Alunos' url='/aluno'/></Col>
									</div>
									<div class='col'>
										<Col><Banner image='./professores grande.jpg' title='Cadastro de Professores' url='/professor'/></Col>
									</div>									
								</Row>
								
								
								<Row>
									<div class='col'>
										<Col><Banner image='./sala grande.jpg' title='Cadastro de Ano' url='/ano'/></Col>
									</div>
									<div class='col'>
										<Col><Banner image='./turma medio.jpg' title='Cadastro de Turma' url='/turma'/></Col>
									</div>
								</Row>
								
								
								<Row>
									<div class='col'>
										<Col><Banner image='./prova grande.jpg' title='Cadastro de Provas' url='/prova'/></Col>
									</div>
									<div class='col'>	
										<Col><Banner image='./nota grande.jpg' title='Cadastro de Notas' url='/nota'/></Col>
									</div>
								</Row>

								<Row>
									<div class='col'>
										<Col><Banner image='./materia grande.jpg' title='Cadastro de Matérias' url='/materia'/></Col>
									</div>
								</Row>
								
							</Container>
						
					</section>

				</React.Fragment>
			);
	}
}