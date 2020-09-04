import React from 'react';
import Header from '../Components/header';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './telas.css';



export default class TelaAno extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			anos:[],
			anoAtual:''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

	}

	componentDidMount(){
		if(localStorage.getItem("anos")){
			const anos = JSON.parse(localStorage.getItem("anos"));
			this.setState({
				anos: anos
			})
		}
		
	}


	handleChange(event){
		this.setState({
			anoAtual: event.target.value
		});
	}

	handleSubmit(ano){
		if(ano.ano !== ""){
			let anos = [];
			if(localStorage.getItem("anos")){
				anos = JSON.parse(localStorage.getItem("anos"));		
			}
			anos[anos.length] = ano;
			localStorage.setItem("anos",JSON.stringify(anos));
		}
		
					
	}

	render(){
		return(
			<React.Fragment>
				<section class="header">
					<Header/>
				</section>
				
				<section class="content">
					<Container class="form">
						<h2>Cadastro de Ano</h2>
						<Form onSubmit={this.handleSubmit.bind(this,{id:this.state.anos.length,ano:this.state.anoAtual})}>
							<Form.Group>
								<Form.Label>Cadastre o Ano</Form.Label>
								<Form.Control type="text" value={this.state.anoAtual} placeholder="Ano" onChange={this.handleChange} required/>
							</Form.Group>
							<div class="button">
								<Button  type="submit" variant="dark">Confirmar</Button>
							</div>
						</Form>
					</Container>

					<Container class="tabela-ano">
						<h2>Tabela de Anos</h2>
						<Table striped bordered hover responsive>
							<thead>
								<tr>
									<th>ID</th>
									<th>Ano</th>
								</tr>
							</thead>
							<tbody>
									{this.state.anos.map( (value) =>(
										<tr>
											<td>{value.id}</td>
											<td>{value.ano}</td>
										</tr>
									))}
							</tbody>
						</Table>
					</Container>
				</section>
			</React.Fragment>
		);
	}
}
