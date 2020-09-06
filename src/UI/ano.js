import React from 'react';
import Header from '../Components/header';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from '../Components/table';
import './telas.css';



export default class TelaAno extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			anos:[],
			anoAtual:'',
			rowSelected:0,
			index:0
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleDelete = this.handleDelete.bind(this);

	}

	componentDidMount(){
		if(localStorage.getItem("anos")){
			const anos = JSON.parse(localStorage.getItem("anos"));
			this.setState({
				anos: anos,
				index:anos[anos.length-1].id+1
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

	handleDelete(){
		const anos = [...this.state.anos];
		if(this.state.rowSelected >=0 && this.state.rowSelected < this.state.anos.length){
			anos.splice(this.state.rowSelected, 1);
			this.setState({
				anos:anos
			})
			localStorage.setItem("anos", JSON.stringify(anos));
		}
	}

	handleSelect(row){
		this.setState({
			rowSelected: row
		});
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
						<Form onSubmit={this.handleSubmit.bind(this,{id:this.state.index,ano:this.state.anoAtual})}>
							<Form.Group>
								<Form.Label>Cadastre o Ano</Form.Label>
								<Form.Control type="text" value={this.state.anoAtual} placeholder="Ano" onChange={this.handleChange} required/>
							</Form.Group>
							<div class="button">
								<Button  type="submit" variant="dark">Cadastrar</Button>
							</div>
						</Form>
					</Container>

					<Container class="tabela-ano">
						<h2>Tabela de Anos</h2>
						<Table 
						data={this.state.anos} 
						select={this.handleSelect}
						columns={[{dataField:'id', text:'ID'}, {dataField:'ano', text:"Ano"}]}
						delete={this.handleDelete}>
						</Table>
					</Container>
				</section>
			</React.Fragment>
		);
	}
}
