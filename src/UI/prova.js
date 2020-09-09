import React from 'react';
import Header from '../Components/header';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from '../Components/table';



export default class TelaProva extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			provas:[],
			materias:[],
			turmas:[],
			professores:[],
			form:{
				selectedMateria:'',
				selectedPeriodo:'',
				selectedTurma:'',
				selectedProfessor:''
			},
			periodo:['Quadrimestre', 'Recuperação'], 
			rowSelected:'',
			index:0
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		
	}

	componentWillMount(){
		let materias = [];
		if(localStorage.getItem("materias")){
			materias = JSON.parse(localStorage.getItem('materias'));
			this.setState({
				materias:materias
			})
		}

		let turmas = [];
		if(localStorage.getItem('turmas')){
			turmas = JSON.parse(localStorage.getItem('turmas'));
			this.setState({
				turmas:turmas
			})
		}

		let professores = [];
		if(localStorage.getItem('professores')){
			professores = JSON.parse(localStorage.getItem('professores'));
			this.setState({
				professores:professores
			})
		}
		
		// adiciona os campos default ao form
		if(materias.length >= 0 && professores.length >=0 && turmas.length >=0){
			if(this.state.form.selectedMateria === '' 
				&& this.state.form.selectedPeriodo === ''
				&& this.state.form.selectedProfessor === ''
				&& this.state.form.selectedTurma === ''){
				this.setState({
					form:{
						selectedMateria:materias[0],
						selectedPeriodo:this.state.periodo[0],
						selectedProfessor:professores[0],
						selectedTurma:turmas[0]
					}
				})
			}
		}


		if(localStorage.getItem('provas')){
			const provas = JSON.parse(localStorage.getItem('provas'));
			if(provas.length > 0){
				this.setState({
					provas:provas,
					index:provas[provas.length-1].id+1
				})
			}
			
		}
	}

	componentDidMount(){
		if(this.state.materias.length <= 0 || this.state.turmas.length <= 0 || this.state.professores.length <= 0){
			let alerta = document.getElementById('alerta');
			alerta.innerText = "Cadastre Matérias, Anos, Turmas e Professores para poder cadastrar Provas";
			let submit = document.getElementById('submit');
			submit.disabled = true;
		}
	}


	handleChange(event, campo){
		let form = this.state.form;
		switch(campo){
			case 'materia':
				form.selectedMateria = this.state.materias.filter( materia => materia.materia === event.target.value )[0];
				break;
			case 'turma':
				form.selectedTurma = this.state.turmas.filter( turma => turma.ano.ano+" "+turma.turma === event.target.value )[0];
				break;
			case 'professor':
				form.selectedProfessor = this.state.professores.filter( professor => professor.nome === event.target.value )[0];
				break;
			case 'periodo':
				form.selectedPeriodo = event.target.value;
				break;
			default:
				break;
		}
		
		this.setState({
			form:form
		})

	}

	handleSubmit(prova){
		let provas = this.state.provas
		provas[provas.length] = prova;
		localStorage.setItem('provas', JSON.stringify(provas));
	}

	handleSelect(row){
		this.setState({
			rowSelected: row
		});
	}

	handleDelete(){
		const provas = this.state.provas;
		if(this.state.rowSelected >=0 && this.state.rowSelected < this.state.provas.length){
			provas.splice(this.state.rowSelected,1);
			this.setState({
				provas:provas
			})
			localStorage.setItem("provas", JSON.stringify(provas));
		}
	}

	render(){
		return(
			<React.Fragment>
				<section class='header'>
					<Header/>
				</section>

				<section class='content'>
					<h2>Cadastro de Provas</h2>
					<h6 id='alerta'></h6>
					<Container class='form'>
						<Form onSubmit={this.handleSubmit.bind(this,
							{id:this.state.index, 
							materia:this.state.form.selectedMateria,
							periodo:this.state.form.selectedPeriodo,
							turma:this.state.form.selectedTurma,
							professor:this.state.form.selectedProfessor
							})}>
							<Form.Group>
								<Form.Label>Selecione a matéria</Form.Label>
								<Form.Control as='select' onChange={ event => this.handleChange(event, 'materia')}>
									{this.state.materias.map( materia => (
										<option>{materia.materia}</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Selecione o período da prova</Form.Label>
								<Form.Control as='select' onChange={ event => this.handleChange(event, 'periodo')}>
									{this.state.periodo.map( periodo => (
										<option>{periodo}</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Selecione a Turma</Form.Label>
								<Form.Control as='select' onChange={ event => this.handleChange(event, 'turma')}>
									{this.state.turmas.map( turma => (
										<option>{turma.ano.ano} {turma.turma}</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Selecione o Professor</Form.Label>
								<Form.Control as='select' onChange={ event => this.handleChange(event, 'professor')}>
									{this.state.professores.map( professor => (
										<option>{professor.nome}</option>
									))}
								</Form.Control>
							</Form.Group>
							<div class='button'>
								<Button id='submit' variant='dark' type='submit'>Cadastrar</Button>
							</div>
						</Form>
					</Container>
					<Container class='table'>
						<h2>Tabela de Provas</h2>
						<Table 
						data={this.state.provas}
						select={this.handleSelect}
						columns={[
								{dataField:'id', text:'ID'}, 
								{dataField:'materia.materia', text:"Matéria"},
								{dataField:'periodo', text:"Período"},
								{dataField:'turma.ano.ano', text:"Ano"},
								{dataField:'turma.turma', text:"Turma"},
								{dataField:'professor.nome', text:"Professor"}]}
						delete={this.handleDelete}>
						</Table>
					</Container>
				</section>
			</React.Fragment>
				
		);
	}
}
