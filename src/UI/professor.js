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
			form:{
				nome:'',
				cpf:'',
				pis:'',
				nascimento:'',
				cadastro:'',
				selectedMateria:'',
				selectedTurma:'' 
			},
			index:0
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentWillMount(){
		let materias;
		if(localStorage.getItem('materias')){
			materias = JSON.parse(localStorage.getItem('materias'));
			this.setState({
				materias:materias,
			})
			if(this.state.form.selectedMateria === ''){
				this.setState({
					form:{...this.state.form, selectedMateria: materias[0]}
				})
			}
		}

		if(localStorage.getItem('turmas')){
			const turmas = JSON.parse(localStorage.getItem('turmas'));
			this.setState({
				turmas:turmas,
			})

			if(this.state.form.selectedTurma === '' && this.state.form.selectedMateria === ''){
				this.setState({
					form:{...this.state.form, selectedMateria: materias[0], selectedTurma: turmas[0]}
				})
			}else if(this.state.form.selectedTurma === ''){
				this.setState({
					form:{...this.state.form, selectedTurma: turmas[0]}
				})
			}		
		}

		if(localStorage.getItem('professores')){
			const professores = JSON.parse(localStorage.getItem('professores'));
			if(professores.length > 0){
				this.setState({
					professores:professores,
					index:professores[professores.length-1].id+1
				})
			}	
		}
	}

	componentDidMount(){
		//mensagem de alerta
		if(this.state.materias.length <= 0 || this.state.turmas <= 0 ){
			let alerta = document.getElementById('alerta');
			alerta.innerText = "Cadastre anos, turmas e matérias para poder cadastrar um professor";
			let submit = document.getElementById('submit');
			submit.disabled = true;
		}
	}

	handleChange(event, campo){
		switch(campo){
			case 'nome':
				this.setState({ form:{...this.state.form, nome:event.target.value} })
				break;
			case 'cpf':
				this.setState({ form:{...this.state.form, cpf:event.target.value }})
				break;
			case 'pis':
				this.setState({ form:{...this.state.form, pis:event.target.value }})
				break;
			case 'nascimento':
				this.setState({ form:{...this.state.form, nascimento:new Date(event.target.value) }})
				break;
			case 'cadastro':
				this.setState({ form:{...this.state.form, cadastro:new Date(event.target.value) }})
				break;
			case 'materia':
				this.setState({ form:{...this.state.form, 
					selectedMateria: this.state.materias.filter( materia => materia.materia === event.target.value)[0] }})
				break;
			case 'turma':
				this.setState({ form:{...this.state.form, 
					selectedTurma:this.state.turmas.filter(turma => turma.ano.ano+" "+turma.turma === event.target.value)[0] }})
				break;
			default:
				break;
		}

	}

	handleSubmit(professor){
		let professores = this.state.professores;
		professores[professores.length] = professor;
		localStorage.setItem('professores', JSON.stringify(professores));
	}

	handleSelect(row){
		this.setState({
			rowSelected: row
		});
	}

	handleDelete(){
		const professores = this.state.professores;
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
						<h6 id='alerta'></h6>
						<Form onSubmit={ this.handleSubmit.bind(this, 
							{id:this.state.index, 
							 nome:this.state.form.nome,
							 cpf:this.state.form.cpf,
							 pis:this.state.form.pis,
							 nasc:this.state.form.nascimento,
							 cad:this.state.form.cadastro,
							 materia:this.state.form.selectedMateria,
							 turma:this.state.form.selectedTurma })}>
							<Form.Group>
								<Form.Label>Inserir Nome:</Form.Label>
								<Form.Control required type='text' placeholder='Nome' onChange={(event) => this.handleChange(event,'nome')}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Inserir CPF:</Form.Label>
								<Form.Control required type='number' placeholder='000.000.000-00' onChange={(event) => this.handleChange(event,'cpf')} >
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Inserir PIS/PASEP:</Form.Label>
								<Form.Control required type='number' placeholder='000.000.000-00' onChange={(event) => this.handleChange(event,'pis')} >
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Inserir Data de Nascimento:</Form.Label>
								<Form.Control required type='date' onChange={(event) => this.handleChange(event,'nascimento')}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Inserir Data de Cadastro:</Form.Label>
								<Form.Control required type='date' onChange={(event) => this.handleChange(event,'cadastro')}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Selecione a matéria que leciona:</Form.Label>
								<Form.Control required as='select' onChange={(event) => this.handleChange(event,'materia')}>
									{this.state.materias.map( materia => (
										<option>{materia.materia}</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Selecione a turma que leciona:</Form.Label>
								<Form.Control as='select' onChange={(event) => this.handleChange(event,'turma')}>
									{this.state.turmas.map( turma => (
										<option>{turma.ano.ano} {turma.turma}</option>
									))}
								</Form.Control>
							</Form.Group>
							<div class="button">
								<Button id='submit' type="submit" variant="dark">Cadastrar</Button>
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
							{dataField:'materia.materia', text:"Materia"},
							{dataField:'turma.ano.ano', text:"Ano"},
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