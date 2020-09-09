import React from 'react';
import Header from '../Components/header';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from '../Components/table';

export default class TelaNota extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			notas:[],
			provas:[],
			alunos:[],
			form:{
				selectedProva:'',
				selectedAluno:'',
				nota:''
			},
			rowSelected:'',
			alunoDefault:'',
			index:0
		}

		this.handleChange = this.handleChange.bind(this);
		this.returnOptions = this.returnOptions.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentWillMount(){
		let provas = [];
		if(localStorage.getItem("provas")){
			provas = JSON.parse(localStorage.getItem("provas"));
			if(provas.length > 0){
				this.setState({
					provas:provas
				})
			}
		}

		let alunos = []
		if(localStorage.getItem("alunos")){
			alunos = JSON.parse(localStorage.getItem("alunos"));
			if(alunos.length > 0){
				this.setState({
					alunos:alunos
				})
			}
		}

		//insere defaults
		if(alunos.length > 0 && provas.length > 0){
			if(this.state.form.selectedProva === '' 
				&& this.state.form.selectedAluno === ''){
				this.setState({
					form:{...this.state.form, selectedProva:provas[0], selectedAluno:alunos[0]}
				})
			}
		}

		if(localStorage.getItem("notas")){
			const notas = JSON.parse(localStorage.getItem("notas"));
			if(notas.length > 0){
				this.setState({
					notas:notas,
					index:notas[notas.length-1].id+1
				})
			}
		}				
	}

	componentDidMount(){
		//mensagem alerta
		if(this.state.provas.length <= 0 || this.state.alunos.length <= 0){
			let alerta = document.getElementById('alerta');
			alerta.innerText = "Cadastre Matérias, Anos, Turmas, Professores e Alunos para poder cadastrar Notas";
			let submit = document.getElementById('submit');
			submit.disabled = true;
		}	
	}

	handleChange(event, campo){
		let form = this.state.form;
		switch(campo){
			case 'prova':
				form.selectedProva = this.state.provas.filter( 
					prova => prova.materia.materia+" "+prova.turma.ano.ano+" "+prova.turma.turma === event.target.value)[0];
				form.selectedAluno = this.state.alunos.filter( 
					aluno => aluno.turma.ano.ano+" "+aluno.turma.turma === 
					form.selectedProva.turma.ano.ano+" "+form.selectedProva.turma.turma)[0];
				break;
			case 'aluno':
				form.selectedAluno = this.state.alunos.filter( aluno => aluno.nome === event.target.value)[0];
			case 'nota':
				form.nota = event.target.value;
			default:
				break;
		}
		
		this.setState({
			form:form
		})

	}

	handleSubmit(nota){
		let notas = this.state.notas;
		notas[notas.length] = nota;
		localStorage.setItem("notas", JSON.stringify(notas));
	}

	handleSelect(row){
		this.setState({
			rowSelected: row
		});
	}

	handleDelete(){
		const notas = [...this.state.notas];
		if(this.state.rowSelected >=0 && this.state.rowSelected < this.state.notas.length){
			notas.splice(this.state.rowSelected,1);
			this.setState({
				notas:notas
			})
			localStorage.setItem("notas", JSON.stringify(notas));
		}
	}

	returnOptions(aluno){
		if(aluno.turma.ano.ano+" "+aluno.turma.turma === 
			this.state.form.selectedProva.turma.ano.ano+" "+this.state.form.selectedProva.turma.turma){
			return <option>{aluno.nome}</option>
		}
	}	

	render(){
		return(
			<React.Fragment>
				<section class='header'>
					<Header/>
				</section>

				<section class='content'>
					<Container class='form'>
						<h2>Cadastro de Notas</h2>
						<h6 id='alerta'></h6>
						<Form onSubmit={this.handleSubmit.bind(this,
							{id:this.state.index,
							 prova:this.state.form.selectedProva,
							 aluno:this.state.form.selectedAluno,
							 nota:this.state.form.nota})}>
							<Form.Group>
								<Form.Label>Selecione a Prova</Form.Label>
								<Form.Control as='select' onChange={(event) => this.handleChange(event, 'prova')}>
									{this.state.provas.map( prova => (
										<option>{prova.materia.materia} {prova.turma.ano.ano} {prova.turma.turma}</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Selecione o Aluno</Form.Label>
								<Form.Control as='select' onChange={(event) => this.handleChange(event, 'aluno')}>
									{this.state.alunos.map(this.returnOptions)}
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Insira a nota do Aluno:</Form.Label>
								<Form.Control required type='number' min={0} max={10} placeholder='Nota' 
								onChange={(event) => this.handleChange(event, 'nota')}></Form.Control>
							</Form.Group>
							<div class='button'>
								<Button id='submit' variant="dark" type='submit'>Cadastrar</Button>
							</div>
						</Form>
					</Container>
					<Container class='table'>
						<h2>Tabela de Notas</h2>
						<Table 
						data={this.state.notas}
						select={this.handleSelect}
						delete={this.handleDelete}
						columns={[
						{dataField:'id', text:'ID'}, 
						{dataField:'prova.materia.materia', text:"Matéria"},
						{dataField:'prova.turma.ano.ano', text:"Ano"},
						{dataField:'prova.turma.turma', text:"Turma"},
						{dataField:'aluno.nome', text:"Aluno"},
						{dataField:'nota', text:"Nota"}]}>
						</Table>
					</Container>
				</section>

			</React.Fragment>
		);
	}
}