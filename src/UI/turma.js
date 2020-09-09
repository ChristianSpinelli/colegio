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
			form:{
				selectedAno:'',
				turma:''
			},
			rowSelected:0,
			index:0
		}

		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleDelete = this.handleDelete.bind(this);

	}

	componentWillMount(){
		//carregar anos cadastrados
		if(localStorage.getItem("anos")){
			const anos = JSON.parse(localStorage.getItem("anos"));
			this.setState({
				anos: anos	
			})
			//inicializando o ano selecionado para o primeiro ano, caso não tenha ano selecionado
			if(this.state.form.selectedAno === ''){
				this.setState({
					form:{...this.state.form, selectedAno:anos[0]}
				})
			}
		}

		//carregar turmas cadastradas
		if(localStorage.getItem("turmas")){
			const turmas = JSON.parse(localStorage.getItem("turmas"));
			if(turmas.length > 0){
				this.setState({
					turmas:turmas,
					index:turmas[turmas.length-1].id+1
				})
			}
		}
	}

	componentDidMount(){
		//se não houver anos cadastrados aparece mensagem de alerta e desabilita botão cadastrar
		if(this.state.anos.length <= 0){
			let txtAlerta = document.getElementById('alerta');
			txtAlerta.innerText = 'Cadastre um ano para poder cadastrar uma turma';
			let submit = document.getElementById('submit');
			submit.disabled = true;
		}
		
	}

	handleChange(event, campo){
		switch(campo){
			case 'turma':
				this.setState({form:{...this.state.form, turma:event.target.value}});
				break;
			case 'ano':
				this.setState({form:{...this.state.form, selectedAno:this.state.anos.filter( ano => ano.ano===event.target.value)[0]}})
				break;
		}
	}


	handleSubmit(turma){
		let turmas = this.state.turmas;
		turmas[turmas.length] = turma;
		localStorage.setItem("turmas", JSON.stringify(turmas));
	}

	handleSelect(row){
		this.setState({
			rowSelected: row
		});
	}

	handleDelete(){
		const turmas = this.state.turmas;
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
						<h6 id='alerta'></h6>
						<Container class='form'>
							<Form onSubmit={this.handleSubmit.bind(this,{id:this.state.index, ano:this.state.form.selectedAno, turma:this.state.form.turma})}>
								<Form.Group>
									<Form.Label>Selecione um ano</Form.Label>
									<Form.Control as="select" onChange={(event) => this.handleChange(event,'ano')}>
										{this.state.anos.map( (ano) => (
											<option>{ano.ano}</option>
										))}
									</Form.Control>
								</Form.Group>
								<Form.Group>
									<Form.Label>Cadastre a Turma</Form.Label>
									<Form.Control required type='text' placeholder='Turma' value={this.state.turmaAtual} 
									onChange={(event) => this.handleChange(event,'turma')}/>
								</Form.Group>
								<div class="button">
									<Button id='submit' type="submit" variant="dark">Cadastrar</Button>
								</div>
							</Form>
						</Container>

						<Container class='table'>
							<h2>Tabela de Turmas</h2>
							<Table
							data={this.state.turmas}
							columns={[
								{dataField:'id', text:'ID'}, 
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
