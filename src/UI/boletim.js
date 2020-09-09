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
			form:{
				selectedAluno:''
			},
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
				form:{...this.state.form, selectedAluno:selectedAluno}
			})
		}else{
			let selectedAluno = this.state.selectedAluno;
			selectedAluno = alunos[0];
			this.setState({
				form:{...this.state.form, selectedAluno:selectedAluno}
			})
		}		
	}

	componentDidMount(){
		let sum = 0;
		let result = 0;
		let count = 0;
		let boletim = [];
		//cria lista de médias por matéria
		for(let i=0; i < this.state.materias.length; i++ ){
			sum = this.state.notas.reduce((sum,nota) => {
				if(nota.prova.materia.materia === this.state.materias[i].materia 
					&& nota.aluno.nome === this.state.form.selectedAluno.nome){
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


		//inserir nome do aluno no título de boletim
		if(this.state.form.selectedAluno !== undefined){
			let txtBoletim = document.getElementById('txtBoletim');
			txtBoletim.innerText = "Boletim de "+this.state.form.selectedAluno.nome;
		}

		//mensagem alerta
		if(this.state.alunos.length <= 0 || this.state.materias.length <= 0 || this.state.notas.length <= 0){
			let alerta = document.getElementById('alerta');
			alerta.innerText = 'Cadastre Alunos, Matérias e Notas para conferir o Boletim de um Aluno';
		}

		if(this.state.form.selectedAluno !== ''){
			let selectAluno = document.getElementById('selectAluno');
			selectAluno.value = this.state.form.selectedAluno.nome;
		}

	
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
						<h6 id='alerta'></h6>
						<Form>
							<Form.Group>
								<Form.Label>Selecione o Aluno:</Form.Label>
								<Form.Control id='selectAluno' as='select' onChange={this.handleChange}>
									{this.state.alunos.map(aluno => (
										<option>{aluno.nome}</option>
									))}
								</Form.Control>
							</Form.Group>
						</Form>
					</Container>
					<Container>
						<h2 id='txtBoletim'>Boletim</h2>
						<VisualTable id='table'
							data={this.state.boletim}
							columns={[
								{dataField:'materia.materia', text:"Matéria"},
								{dataField:'count', text:'Quantidade de Notas'},
								{dataField:'media', text:"Média"}]}>
						</VisualTable>
					</Container>
				</section>
			</React.Fragment>
		);
	}
}