import React from 'react';
import Header from '../Components/header';
import Container from 'react-bootstrap/Container';
import Table from '../Components/table';
import Form from 'react-bootstrap/Form';
import VisualTable from '../Components/visualizationTable';
import './telas.css';

export default class TelaAta extends React.Component{
	constructor(props){
		super(props);
		this.state={
			alunos:[],
			turmas:[],
			info:[]
		}

		this.handleChange = this.handleChange.bind(this);
	}

	componentWillMount(){
		if(localStorage.getItem('turmas')){
			let turmas = JSON.parse(localStorage.getItem('turmas'));
			if(turmas.length > 0){
				this.setState({
					turmas:turmas
				})

			}
			let alunos=[];
			if(localStorage.getItem('alunos')){
				alunos = JSON.parse(localStorage.getItem('alunos'));
				if(alunos.length > 0){
					this.setState({
						alunos:alunos
					})
				}
			}

			if(this.state.info[0] === undefined){
				let info = [...this.state.info];
				info[0] = turmas[0];
				let turma = turmas[0].ano.ano+" "+turmas[0].turma;
				info[1] = alunos.filter(aluno => aluno.turma.ano.ano+" "+aluno.turma.turma === turma);
				this.setState({
					info:info
				})
			}
			
		}

	}

	handleChange(event){
		let info = [...this.state.info];
		info[0] = this.state.turmas.filter(turma => turma.ano.ano+" "+turma.turma === event.target.value)[0];
		info[1] = this.state.alunos.filter(aluno => aluno.turma.ano.ano+" "+aluno.turma.turma === event.target.value);
		this.setState({
			info:info
		})
	}



	render(){
		return(
			<React.Fragment>
				<section class='header'>
					<Header/>
				</section>

				<section class='content'>
					<Container class='form'>
						<h2>Ata de alunos</h2>
						<Form>	
							<Form.Group>
								<Form.Label>Selecione a turma:</Form.Label>
								<Form.Control as='select' onChange={this.handleChange}>
									{this.state.turmas.map(turma => (
										<option>{turma.ano.ano} {turma.turma}</option>
									))}
								</Form.Control>
							</Form.Group>
						</Form>
					</Container>
					<Container class='table'>
						<h2>Lista de alunos do {this.state.info[0].ano.ano} {this.state.info[0].turma}</h2>
						<VisualTable
							data={this.state.info[1]}
							columns={[
								{dataField:'id', text:"ID"},
								{dataField:'nome', text:"Nome"},
								{dataField:'mat', text:"Nº de Matrícula"},
								{dataField:'turma.ano.id', text:"ID Ano"},
								{dataField:'turma.ano.ano', text:"Ano"},
								{dataField:'turma.id', text:"ID Turma"},
								{dataField:'turma.turma', text:"Turma"},
								{dataField:'end', text:"Endereço"},
								{dataField:'pais', text:"Pais"},
								{dataField:'nasc', text:"Data de Nascimento"},
								{dataField:'obs', text:"Observações"}]}>
						</VisualTable>
					</Container>
				</section>
			</React.Fragment>
		);
	}
}