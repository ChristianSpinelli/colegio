import React from 'react';
import Header from '../Components/header';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import VisualTable from '../Components/visualizationTable';
import './telas.css';

export default class TelaBoletim extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			notas:[],
			materias:[],
			alunos:[],
			selectedAluno:'',
			boletim:[]
		}

		this.handleChange = this.handleChange.bind(this);
	
	}

	componentWillMount(){
		let notas = []
		if(localStorage.getItem('notas')){
			notas = JSON.parse(localStorage.getItem('notas'));
			if(notas.length > 0){
				this.setState({
					notas:notas
				})
			}
		}
		
		let materias = [];
		if(localStorage.getItem('materias')){
			materias = JSON.parse(localStorage.getItem('materias'));
			if(materias.length > 0){
				this.setState({
					materias:materias
				})
			}
		}

		let alunos = [];
		if(localStorage.getItem('alunos')){
			alunos = JSON.parse(localStorage.getItem('alunos'));
			if(alunos.length > 0){
				this.setState({
					alunos:alunos

				})
			}
		}

		if(localStorage.getItem('selectedAluno')){
			let selectedAluno = JSON.parse(localStorage.getItem("selectedAluno"));
			this.setState({
				selectedAluno:selectedAluno
			})
		}else{
			let selectedAluno = [...this.state.selectedAluno];
			selectedAluno = alunos[0];
			this.setState({
				selectedAluno:selectedAluno
			})
		}

		
	}

	componentDidMount(){


		let sum = 0;
		let result = 0;
		let count = 0;
		let boletim = [];
		console.log(this.state.selectedAluno);
		for(let i=0; i < this.state.materias.length; i++ ){
			sum = this.state.notas.reduce((sum,nota) => {
				if(nota.prova.materia.materia === this.state.materias[i].materia 
					&& nota.aluno.nome === this.state.selectedAluno.nome){
					count++;
					result = sum + parseInt(nota.nota,10);
				}
				return result;
			},0);

			if(count>0){
				boletim[i] = {media:sum/count, materia:this.state.materias[i], count:count};
			}else{
					boletim[i] ={media:0, materia:this.state.materias[i], count:0};
			}

			count = 0;
			result = 0;
		}
		
		this.setState({
			boletim:boletim
		})
	}

	handleChange(event){
		let selectedAluno = this.state.alunos.filter( aluno => aluno.nome === event.target.value )[0];
		localStorage.setItem('selectedAluno',JSON.stringify(selectedAluno));
		window.location.reload(false);		
	}

	render(){
		return(
			<React.Fragment>
				<section class='header'>
					<Header/>
				</section>

				<section class='content'>
					<Container class='form'>
						<h2>Tela de Boletim</h2>
						<Form>
							<Form.Group>
								<Form.Label>Selecione o Aluno:</Form.Label>
								<Form.Control value={this.state.selectedAluno.nome} as='select' onChange={this.handleChange}>
									{this.state.alunos.map(aluno => (
										<option>{aluno.nome}</option>
									))}
								</Form.Control>
							</Form.Group>
						</Form>
					</Container>
					<Container>
						<h2>Boletim de {this.state.selectedAluno.nome}</h2>
						<VisualTable
							data={this.state.boletim}
							columns={[
								{dataField:'materia.id', text:"ID Matéria"},
								{dataField:'materia.materia', text:"Matéria"},
								{dataField:'count', text:"Quantidade de Notas"},
								{dataField:'media', text:"Média"},]}>
						</VisualTable>
					</Container>
				</section>
			</React.Fragment>
		);
	}
}