import React from 'react';
import Header from '../Components/header';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import VisualTable from '../Components/visualizationTable';
import './telas.css';

export default class TelaAta extends React.Component{
	constructor(props){
		super(props);
		this.state={
			alunos:[],
			turmas:[],
			form:{
				selectedTurma:''
			},
			ata:[]
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

			if(this.state.form.selectedTurma === ''){
				let selectedTurma = turmas[0];
				let ata = alunos.filter( 
					aluno => aluno.turma.ano.ano+" "+aluno.turma.turma === selectedTurma.ano.ano+" "+selectedTurma.turma);
				this.setState({
					form:{selectedTurma:selectedTurma},
					ata:ata
				})
			}
			
		}

	}

	componentDidMount(){
		//mensagem alerta
		if(this.state.alunos.length <= 0 || this.state.turmas.length <= 0){
			let alerta = document.getElementById('alerta');
			alerta.innerText = "Cadastre Alunos, Anos e Turmas para verificar a Ata de uma Turma";
		}
	}

	handleChange(event){
		let form = this.state.form;
		form.selectedTurma = this.state.turmas.filter(turma => turma.ano.ano+" "+turma.turma === event.target.value)[0];
		let ata = this.state.alunos.filter(aluno => aluno.turma.ano.ano+" "+aluno.turma.turma === event.target.value);
		this.setState({
			form:form,
			ata:ata
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
						<h6 id='alerta'></h6>
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
						<h2 id='alunos'>Lista de alunos</h2>
						<VisualTable
							data={this.state.ata}
							columns={[
								{dataField:'id', text:"ID"},
								{dataField:'nome', text:"Nome"},
								{dataField:'mat', text:"Nº de Matrícula"},
								{dataField:'turma.ano.ano', text:"Ano"},
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