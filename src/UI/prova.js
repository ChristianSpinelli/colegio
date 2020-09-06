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
			info:[],
			periodo:['Quadrimestre', 'Recuperação'], 
			rowSelected:'',
			index:0
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		
	}

	componentDidMount(){
		if(localStorage.getItem("materias")){
			const materias = JSON.parse(localStorage.getItem('materias'));
			this.setState({
				materias:materias
			})
		}

		if(localStorage.getItem('turmas')){
			const turmas = JSON.parse(localStorage.getItem('turmas'));
			this.setState({
				turmas:turmas
			})
		}

		if(localStorage.getItem('professores')){
			const professores = JSON.parse(localStorage.getItem('professores'));
			this.setState({
				professores:professores
			})
		}

		if(localStorage.getItem('provas')){
			const provas = JSON.parse(localStorage.getItem('provas'));
			this.setState({
				provas:provas,
				index:provas[provas.length-1].id+1
			})
		}
	}


	handleChange(event, position){
		let info = [...this.state.info];
		switch(position){
			case 0:
				info[position] = this.state.materias.filter( materia => materia.materia === event.target.value )[0];
				break;
			case 2:
				info[position] = this.state.turmas.filter( turma => turma.ano.ano+" "+turma.turma === event.target.value )[0];
				break;
			case 3:
				info[position] = this.state.professores.filter( professor => professor.nome === event.target.value )[0];
				break;
			default:
				info[position] = event.target.value;
				break;
		}
		
		this.setState({
			info:info
		})

		console.log(info);
	}

	handleSubmit(prova){
		let provas = [];

		if(prova.materia === undefined){
			prova.materia = this.state.materias[0];
		}

		if(prova.periodo === undefined){
			prova.periodo = this.state.periodo[0];
		}

		if(prova.turma === undefined){
			prova.turma = this.state.turmas[0];
		}

		if(prova.professor === undefined){
			prova.professor = this.state.professores[0];
		}

		if(localStorage.getItem('provas')){
			provas = JSON.parse(localStorage.getItem('provas'));
		}
		provas[provas.length] = prova;
	
		
		localStorage.setItem('provas', JSON.stringify(provas));
	}

	handleSelect(row){
		this.setState({
			rowSelected: row
		});
	}

	handleDelete(){
		const provas = [...this.state.provas];
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
					<Container class='form'>
						<Form onSubmit={this.handleSubmit.bind(this,
							{id:this.state.index, 
							materia:this.state.info[0],
							periodo:this.state.info[1],
							turma:this.state.info[2],
							professor:this.state.info[3]
							})}>
							<Form.Group>
								<Form.Label>Selecione a matéria</Form.Label>
								<Form.Control as='select' onChange={ event => this.handleChange(event, 0)}>
									{this.state.materias.map( materia => (
										<option>{materia.materia}</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Selecione o período da prova</Form.Label>
								<Form.Control as='select' onChange={ event => this.handleChange(event, 1)}>
									{this.state.periodo.map( periodo => (
										<option>{periodo}</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Selecione a Turma</Form.Label>
								<Form.Control as='select' onChange={ event => this.handleChange(event, 2)}>
									{this.state.turmas.map( turma => (
										<option>{turma.ano.ano} {turma.turma}</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Selecione o Professor</Form.Label>
								<Form.Control as='select' onChange={ event => this.handleChange(event, 3)}>
									{this.state.professores.map( professor => (
										<option>{professor.nome}</option>
									))}
								</Form.Control>
							</Form.Group>
							<div class='button'>
								<Button variant='dark' type='submit'>Cadastrar</Button>
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
								{dataField:'materia.id', text:"ID Matéria"},
								{dataField:'materia.materia', text:"Matéria"},
								{dataField:'periodo', text:"Período"},
								{dataField:'turma.ano.id', text:"ID Ano"},
								{dataField:'turma.ano.ano', text:"Ano"},
								{dataField:'turma.id', text:"ID Turma"},
								{dataField:'turma.turma', text:"Turma"},
								{dataField:'professor.id', text:"ID Professor"},
								{dataField:'professor.nome', text:"Professor"}]}
						delete={this.handleDelete}>
						</Table>
					</Container>
				</section>
			</React.Fragment>
				
		);
	}
}
