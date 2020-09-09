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
			form:{
				nome:'',
				matricula:'',
				nascimento:'',
				endereco:'',
				pais:'',
				observacoes:'',
				selectedTurma:''
			},
			index:0,
			rowSelected:''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentWillMount(){
		//carregando turmas cadastradas
		if(localStorage.getItem("turmas")){
			const turmas = JSON.parse(localStorage.getItem("turmas"));
			this.setState({
				turmas:turmas,
			})

			//inicializando a turma selecionada para a primeira turma, caso não tenha turma selecionada
			if(this.state.form.selectedTurma === ''){
				this.setState({
					form:{...this.state.form, selectedTurma:turmas[0]}
				})
			}
		}

		//carregando alunos cadastrados
		if(localStorage.getItem("alunos")){
			const alunos = JSON.parse(localStorage.getItem("alunos"));
			if(alunos.length > 0){
				this.setState({
					alunos:alunos,
					index:alunos[alunos.length-1].id+1
				})
			}			
		}
	}

	componentDidMount(){
		//verifica se tem turmas e anos cadastrados para poder cadastrar o aluno em uma turma.
		if(this.state.turmas.length <= 0){
			let alerta = document.getElementById('alerta');
			alerta.innerText = "Cadastre Anos e Turmas para poder cadastrar Alunos";
			//desabilita botão de cadastrar
			let submit = document.getElementById('submit');
			submit.disabled = true;
		}
	}

	handleChange(event, campo){
		//inserindo os campos conforme o usuario preenche o formulario.
		switch(campo){
			case 'nome':
				this.setState({form:{...this.state.form, nome:event.target.value}});
				break;
			case 'matricula':
				this.setState({form:{...this.state.form, matricula:event.target.value}});
				break;
			case 'nascimento':
				this.setState({form:{...this.state.form, nascimento: new Date(event.target.value)}});
				break;
			case 'endereco':
				this.setState({form:{...this.state.form, endereco:event.target.value}});
				break;
			case 'pais':
				this.setState({form:{...this.state.form, pais:event.target.value}});
				break;
			case 'observacoes':
				this.setState({form:{...this.state.form, observacoes:event.target.value}});
				break;
			case 'turma':
				//o campo turma é um objeto, então filtro na lista de turmas um objeto com o mesmo valor da turma selecionada
				this.setState({form:{...this.state.form, 
					selectedTurma:this.state.turmas.filter(turma => turma.ano.ano+" "+turma.turma === event.target.value)[0]}});
				break;
			default:
				break;
				
		}
	}

	handleSubmit(aluno){
		//insere o aluno informado na última posição e salva no banco de dados
		let alunos = this.state.alunos;
		alunos[alunos.length] = aluno;
		localStorage.setItem('alunos', JSON.stringify(alunos));		
	}

	handleSelect(row){
		//insere qual linha da tabela foi selecionada pelo usuario
		this.setState({
			rowSelected: row
		});
	}

	handleDelete(){
		const alunos = this.state.alunos;
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
					<h6 id='alerta'></h6>
					<Container class='form'>
						<Form onSubmit={this.handleSubmit.bind(this,
							{id:this.state.index, 
							nome:this.state.form.nome, 
							mat:this.state.form.matricula,
							nasc:this.state.form.nascimento,
							end:this.state.form.endereco,
							pais:this.state.form.pais,
							obs:this.state.form.observacoes,
							turma:this.state.form.selectedTurma })}>
							<Form.Group>
								<Form.Label>Insira o nome:</Form.Label>
								<Form.Control required type='text' placeholder="Nome" 
								onChange={(event) => this.handleChange(event,'nome')}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Insira número de matrícula:</Form.Label>
								<Form.Control required type='number' placeholder="000-00" 
								onChange={(event) => this.handleChange(event,'matricula')}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Insira a data de nascimento:</Form.Label>
								<Form.Control required type='date' 
								onChange={(event) => this.handleChange(event,'nascimento')}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Insira o endereço:</Form.Label>
								<Form.Control required type='text' placeholder='Nome da rua' 
								onChange={(event) => this.handleChange(event,'endereco')}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Insira o nome dos pais ou responsáveis:</Form.Label>
								<Form.Control required type='text' placeholder='Nome dos pais ou responsáveis' 
								onChange={(event) => this.handleChange(event,'pais')}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Observações:</Form.Label>
								<Form.Control required type='text' placeholder='Observações' 
								onChange={(event) => this.handleChange(event,'observacoes')}>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Selecione o Ano e a turma</Form.Label>
								<Form.Control as="select" onChange={(event) => this.handleChange(event,'turma')}>
									{this.state.turmas.map( turma =>(
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
						<h2>Tabela de Alunos</h2>
						<Table 
						data={this.state.alunos} 
						select={this.handleSelect}
						columns={[{dataField:'id', text:'ID'}, 
							{dataField:'mat', text:"Nº de Matrícula"},
							{dataField:'nome', text:"Aluno"},
							{dataField:'turma.ano.ano', text:"Ano"},
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