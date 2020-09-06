import React from 'react';
import Header from '../Components/header';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from '../Components/table';


export default class TelaProfessor extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			professores:[],
			materias:[],
			turmas:[],
			informations:[],
			materiaDefault:'',
			turmaDefault:'',
			index:0
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount(){
		if(localStorage.getItem('materias')){
			const materias = JSON.parse(localStorage.getItem('materias'));
			this.setState({
				materias:materias,
				materiaDefault:materias[0]
			})
		}

		if(localStorage.getItem('turmas')){
			const turmas = JSON.parse(localStorage.getItem('turmas'));
			this.setState({
				turmas:turmas,
				turmaDefault:turmas[0]
			})
		}

		if(localStorage.getItem('professores')){
			const professores = JSON.parse(localStorage.getItem('professores'));
			this.setState({
				professores:professores,
				index:professores[professores.length-1].id+1
			})
		}


	}

	handleChange(event, position){
		let informations = [...this.state.informations];
		if(position<5){
			informations[position] = event.target.value;
		}else if(position === 5){
			informations[position] = this.state.materias.filter( materia => materia.materia === event.target.value)[0];
		}else if(position === 6){
			informations[position] = this.state.turmas.filter( turma => turma.ano.ano+" "+turma.turma === event.target.value)[0];
		}
		
		this.setState({
			informations:informations
		})

	}

	handleSubmit(professor){
		let professores = [];
		if(localStorage.getItem("professores")){
			professores = JSON.parse(localStorage.getItem('professores'));
		}
		if(professor.materia===undefined){
			professor.materia = this.state.materiaDefault;
		}
		if(professor.turma===undefined){
			professor.turma = this.state.turmaDefault;
		}
		professores[professores.length] = professor;
		localStorage.setItem('professores', JSON.stringify(professores));
	}

	handleSelect(row){
		this.setState({
			rowSelected: row
		});
	}

	handleDelete(){
		const professores = [...this.state.professores];
		if(this.state.rowSelected >=0 && this.state.rowSelected < this.state.professores.length){
			professores.splice(this.state.rowSelected,1);
			this.setState({
				professores:professores
			})
			localStorage.setItem("professores", JSON.stringify(professores));
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
						<h2>Cadastro de Professores</h2>
						<Form onSubmit={ this.handleSubmit.bind(this, 
							{id:this.state.index, 
							 nome:this.state.informations[0],
							 cpf:this.state.informations[1],
							 pis:this.state.informations[2],
							 nasc:this.state.informations[3],
							 cad:this.state.informations[4],
							 materia:this.state.informations[5],
							 turma:this.state.informations[6] })}>
							<Form.Group>
								<Form.Label>Inserir Nome:</Form.Label>
								<Form.Control required type='text' placeholder='Nome' onChange={(event) => this.handleChange(event,0)}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Inserir CPF:</Form.Label>
								<Form.Control required type='number' placeholder='000.000.000-00' onChange={(event) => this.handleChange(event,1)} >
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Inserir PIS/PASEP:</Form.Label>
								<Form.Control required type='number' placeholder='000.000.000-00' onChange={(event) => this.handleChange(event,2)} >
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Inserir Data de Nascimento:</Form.Label>
								<Form.Control required type='date' onChange={(event) => this.handleChange(event,3)}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Inserir Data de Cadastro:</Form.Label>
								<Form.Control required type='date' onChange={(event) => this.handleChange(event,4)}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Selecione a matéria que leciona:</Form.Label>
								<Form.Control required as='select' onChange={(event) => this.handleChange(event,5)}>
									{this.state.materias.map( materia => (
										<option>{materia.materia}</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Selecione a turma que leciona:</Form.Label>
								<Form.Control as='select' onChange={(event) => this.handleChange(event,6)}>
									{this.state.turmas.map( turma => (
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
						<h2>Tabela de Professores</h2>
						<Table
							data={this.state.professores}
							columns={ [
							{dataField:'id', text:'ID'}, 
							{dataField:'nome', text:"Nome"},
							{dataField:'cpf', text:"CPF"},
							{dataField:'pis', text:"PIS/PASEP"},
							{dataField:'materia.id', text:"ID Materia"},
							{dataField:'materia.materia', text:"Materia"},
							{dataField:'turma.ano.id', text:"ID Ano"},
							{dataField:'turma.ano.ano', text:"Ano"},
							{dataField:'turma.id', text:"ID Turma"},
							{dataField:'turma.turma', text:"Turma"},
							{dataField:'nasc', text:"Data de Nascimento"},
							{dataField:'cad', text:"Data de Cadastro"}]}
							select={this.handleSelect}
							delete={this.handleDelete}>
						</Table>
					</Container>
				</section>

			</React.Fragment>
				
		);
	}
}