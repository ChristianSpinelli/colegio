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
			info:[],
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
		if(localStorage.getItem("provas")){
			const provas = JSON.parse(localStorage.getItem("provas"));
			if(provas.length > 0){
				this.setState({
					provas:provas
				})

				if(this.state.info[0] === undefined){
					let info = [...this.state.info];
					info[0] = provas[0];
					this.setState({
						info:info
					})
				}
			}
		}			
	}

	componentDidMount(){
		if(localStorage.getItem("alunos")){
			const alunos = JSON.parse(localStorage.getItem("alunos"));
			if(alunos.length > 0){
				this.setState({
					alunos:alunos
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

	handleChange(event, position){
		let info = [...this.state.info];
		let alunoDefault = this.state.alunoDefault;
		switch(position){
			case 0:
				info[position] = this.state.provas.filter
				( prova => prova.materia.materia+" "+prova.turma.ano.ano +" "+prova.turma.turma === event.target.value)[0];
				alunoDefault = this.state.alunos.filter
				( aluno => aluno.turma.ano.ano+" "+aluno.turma.turma === info[position].turma.ano.ano+" "+info[position].turma.turma)[0];
				break;
			case 1:
				info[position] = this.state.alunos.filter( aluno => aluno.nome === event.target.value)[0];
				break;
			default:
				info[position] = event.target.value;
				break;
		}
		this.setState({
			info:info,
			alunoDefault:alunoDefault
		})

	}

	handleSubmit(nota){
		let notas =[];
		if(localStorage.getItem("notas")){
			notas = JSON.parse(localStorage.getItem('notas'));
		}
		if(nota.aluno===undefined){
			if(this.state.alunoDefault !== ''){
				nota.aluno = this.state.alunoDefault;
			}else{
				nota.aluno = this.state.alunos[0];
			}
			
		}
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
			this.state.info[0].turma.ano.ano+" "+this.state.info[0].turma.turma){
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
						<Form onSubmit={this.handleSubmit.bind(this,
							{id:this.state.index,
							 prova:this.state.info[0],
							 aluno:this.state.info[1],
							 nota:this.state.info[2]})}>
							<Form.Group>
								<Form.Label>Selecione a Prova</Form.Label>
								<Form.Control as='select' onChange={(event) => this.handleChange(event, 0)}>
									{this.state.provas.map( prova => (
										<option>{prova.materia.materia} {prova.turma.ano.ano} {prova.turma.turma}</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Selecione o Aluno do {this.state.info[0].turma.ano.ano} {this.state.info[0].turma.turma}</Form.Label>
								<Form.Control as='select' onChange={(event) => this.handleChange(event, 1)}>
									{this.state.alunos.map(this.returnOptions)}
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Insira a nota do Aluno:</Form.Label>
								<Form.Control required type='number' min={0} max={10} placeholder='Nota' onChange={(event) => this.handleChange(event, 2)}></Form.Control>
							</Form.Group>
							<div class='button'>
								<Button variant="dark" type='submit'>Cadastrar</Button>
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
						{dataField:'prova.materia.id', text:"ID Matéria"},
						{dataField:'prova.materia.materia', text:"Matéria"},
						{dataField:'prova.turma.ano.id', text:"ID Ano"},
						{dataField:'prova.turma.ano.ano', text:"Ano"},
						{dataField:'prova.turma.id', text:"ID Turma"},
						{dataField:'prova.turma.turma', text:"Turma"},
						{dataField:'aluno.id', text:"ID Aluno"},
						{dataField:'aluno.nome', text:"Aluno"},
						{dataField:'nota', text:"Nota"}]}>
						</Table>
					</Container>
				</section>

			</React.Fragment>
		);
	}
}