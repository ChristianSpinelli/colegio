import React from 'react';
import Header from '../Components/header';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from '../Components/table';
import './telas.css';


export default class TelaAluno extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			alunos:[],
			turmas:[],
			informations:[],
			index:0,
			defaultTurma:""
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount(){
		if(localStorage.getItem("turmas")){
			const turmas = JSON.parse(localStorage.getItem("turmas"));
			this.setState({
				turmas:turmas,
				defaultTurma:turmas[0]
			})
		}

		if(localStorage.getItem("alunos")){
			const alunos = JSON.parse(localStorage.getItem("alunos"));
			this.setState({
				alunos:alunos,
				index:alunos[alunos.length-1].id+1
			})

		}
	}

	handleChange(event, position){
		let informations = [...this.state.informations];
		if(position < 6){
			informations[position] = event.target.value;
			
		}else{
			informations[position] = this.state.turmas.filter(turma => turma.ano.ano+" "+turma.turma === event.target.value)[0]
		}
		this.setState({
				informations:informations
		})
	}

	handleSubmit(aluno){
		let alunos = [];
		if(localStorage.getItem("alunos")){
			alunos = JSON.parse(localStorage.getItem('alunos'));
		}
		if(aluno.turma === undefined){
			aluno.turma = this.state.defaultTurma;
		}
		alunos[alunos.length] = aluno;
		localStorage.setItem('alunos', JSON.stringify(alunos));
	}

	handleSelect(row){
		this.setState({
			rowSelected: row
		});
	}

	handleDelete(){
		const alunos = [...this.state.alunos];
		if(this.state.rowSelected >=0 && this.state.rowSelected < this.state.alunos.length){
			alunos.splice(this.state.rowSelected,1);
			this.setState({
				alunos:alunos
			})
			localStorage.setItem("alunos", JSON.stringify(alunos));
		}
	}

	render(){
		return(
			<React.Fragment>
				<section class="header">
					<Header/>
				</section>

				<section class='content'>
					<h2>Cadastro de Alunos</h2>
					<Container class='form'>
						<Form onSubmit={this.handleSubmit.bind(this,
							{id:this.state.index, 
							nome:this.state.informations[0], 
							mat:this.state.informations[1],
							nasc:this.state.informations[2],
							end:this.state.informations[3],
							pais:this.state.informations[4],
							obs:this.state.informations[5],
							turma:this.state.informations[6] })}>
							<Form.Group>
								<Form.Label>Insira o nome:</Form.Label>
								<Form.Control required type='text' placeholder="Nome" onChange={(event) => this.handleChange(event, 0)}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Insira número de matrícula:</Form.Label>
								<Form.Control required type='number' placeholder="000-00" onChange={(event) => this.handleChange(event, 1)}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Insira a data de nascimento:</Form.Label>
								<Form.Control required type='date' onChange={(event) => this.handleChange(event, 2)}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Insira o endereço:</Form.Label>
								<Form.Control required type='text' placeholder='Nome da rua' onChange={(event) => this.handleChange(event, 3)}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Insira o nome dos pais ou responsáveis:</Form.Label>
								<Form.Control required type='text' placeholder='Nome dos pais ou responsáveis' onChange={(event) => this.handleChange(event, 4)}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Observações:</Form.Label>
								<Form.Control required type='text' placeholder='Observações' onChange={(event) => this.handleChange(event, 5)}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Selecione o Ano e a turma</Form.Label>
								<Form.Control as="select" onChange={(event) => this.handleChange(event, 6)}>
									{this.state.turmas.map( turma =>(
										<option>{turma.ano.ano} {turma.turma}</option>
									))}
								</Form.Control>
							</Form.Group>
							<div class="button">
								<Button  type="submit" variant="dark">Cadastrar</Button>
							</div>
						</Form>
					</Container>

					<Container class='table'>
						<h2>Tabela de Alunos</h2>
						<Table 
						data={this.state.alunos} 
						select={this.handleSelect}
						columns={[{dataField:'id', text:'ID'}, 
							{dataField:'mat', text:"Nº de Matrícula"},
							{dataField:'nome', text:"Aluno"},
							{dataField:'turma.ano.id', text:"ID Ano"},
							{dataField:'turma.ano.ano', text:"Ano"},
							{dataField:'turma.id', text:"ID Turma"},
							{dataField:'turma.turma', text:"Turma"},
							{dataField:'nasc', text:"Nascimento"},
							{dataField:'end', text:"Endereço"},
							{dataField:'pais', text:"Pais"},
							{dataField:'obs', text:"Observações"}]}
						delete={this.handleDelete}>
						</Table>
					</Container>
				</section>
			</React.Fragment>
		);
	}
}