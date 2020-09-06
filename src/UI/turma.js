import React from 'react';
import Header from '../Components/header';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from '../Components/table';
import './telas.css';



export default class TelaTurma extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			anos:[],
			turmas:[],
			turmaAtual:'',
			selectedAno:'',
			rowSelected:0,
			index:0
		}

		this.handleChangeTurma = this.handleChangeTurma.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeAno = this.handleChangeAno.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleDelete = this.handleDelete.bind(this);

	}

	componentDidMount(){
		if(localStorage.getItem("anos")){
			const anos = JSON.parse(localStorage.getItem("anos"));
			this.setState({
				anos: anos	
			})

			if(this.state.selectedAno===''){
				this.setState({
					selectedAno:anos[0]
				})
			}
		}

		if(localStorage.getItem("turmas")){
			const turmas = JSON.parse(localStorage.getItem("turmas"));
			this.setState({
				turmas:turmas,
				index:turmas[turmas.length-1].id+1
			})
		}


	}

	handleChangeTurma(event){
		this.setState({
			turmaAtual: event.target.value
		})
	}

	handleChangeAno(event){
		this.setState({
			selectedAno: this.state.anos.filter( ano => ano.ano===event.target.value)[0]
		})
	}

	handleSubmit(turma){
		if(turma !== ""){
			let turmas = [];
			if(localStorage.getItem("turmas")){
				turmas = JSON.parse(localStorage.getItem("turmas"));
			}
			turmas[turmas.length] = turma;
			localStorage.setItem("turmas", JSON.stringify(turmas));
		}
	}

	handleSelect(row){
		this.setState({
			rowSelected: row
		});
	}

	handleDelete(){
		const turmas =[...this.state.turmas];
		if(this.state.rowSelected >=0 && this.state.rowSelected < this.state.turmas.length){
			turmas.splice(this.state.rowSelected,1);
			this.setState({
				turmas:turmas
			})
			localStorage.setItem("turmas", JSON.stringify(turmas));
		}
	}



	render(){
		return(
				<React.Fragment>
					<section class="header">
						<Header />
					</section>

					<section class="content">
						<h2>Cadastro de Turmas</h2>
						<Container class='form'>
							<Form onSubmit={this.handleSubmit.bind(this,{id:this.state.index, ano:this.state.selectedAno, turma:this.state.turmaAtual})}>
								<Form.Group>
									<Form.Label>Selecione um ano</Form.Label>
									<Form.Control as="select" onChange={this.handleChangeAno}>
										{this.state.anos.map( (ano) => (
											<option>{ano.ano}</option>
										))}
									</Form.Control>
								</Form.Group>
								<Form.Group>
									<Form.Label>Cadastre a Turma</Form.Label>
									<Form.Control required type='text' placeholder='Turma' value={this.state.turmaAtual} onChange={this.handleChangeTurma}/>
								</Form.Group>
								<div class="button">
									<Button  type="submit" variant="dark">Cadastrar</Button>
								</div>
							</Form>
						</Container>

						<Container class='table'>
							<h2>Tabela de Turmas</h2>
							<Table
							data={this.state.turmas}
							columns={[
								{dataField:'id', text:'ID'}, 
								{dataField:'ano.id', text:"ID Ano"},
								{dataField:'ano.ano', text:"Ano"}, 
								{dataField:'turma', text:'Turma'}]}
							select={this.handleSelect}
							delete={this.handleDelete}>
							</Table>
						</Container>
					</section>

				</React.Fragment>
			);
	}
}
