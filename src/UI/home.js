import React from "react";
import Header from '../Components/header';
import Banner from '../Components/banner';
import "./home.css";


export default class Home extends React.Component{
	render(){
		return(
				<React.Fragment>
					<section class='header'>	
						<Header/>
					</section>

					<section class='content'>
						<div class='column'>
							<Banner image='./students grande.jpg' title='Cadastro de Alunos' url='/aluno'/>
							<Banner image='./sala grande.jpg' title='Cadastro de Série/Turma' url='/turma'/>
						</div>
						<div class='column'>
							<Banner image='./professores grande.jpg' title='Cadastro de Professores' url='/professor'/>
							<Banner image='./materia grande.jpg' title='Cadastro de Matérias' url='/materia'/>
						</div>
						<div class='column'>
							<Banner image='./prova grande.jpg' title='Cadastro de Provas' url='/prova'/>
							<Banner image='./nota grande.jpg' title='Cadastro de Nota' url='/nota'/>
						</div>
					</section>

				</React.Fragment>
			);
	}
}