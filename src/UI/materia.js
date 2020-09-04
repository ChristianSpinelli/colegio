import React from 'react';
import Header from '../Components/header';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import './telas.css';


export default class TelaMateria extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			materias:[],
			materiaAtual:'',
			rowSelected:0,
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
				materias:materias,
				index:materias[materias.length-1].id+1
			})
		}
	}

	handleChange(event){
		this.setState({
			materiaAtual: event.target.value
		})
	}

	handleSubmit(materia){
		let materias = [];
		if(localStorage.getItem("materias")){
			materias = JSON.parse(localStorage.getItem("materias"));
		}
		materias[materias.length] = materia;
		localStorage.setItem("materias", JSON.stringify(materias));
	}

	handleSelect(row){
		this.setState({
			rowSelected: row
		});
	}

	handleDelete(){
		const materias = [...this.state.materias];
		if(this.state.rowSelected >=0 && this.state.rowSelected < this.state.materias.length){
			materias.splice(this.state.rowSelected,1);
			this.setState({
				materias:materias
			})
			localStorage.setItem("materias", JSON.stringify(materias));
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
						<Form onSubmit={this.handleSubmit.bind(this,{id:this.state.index, materia:this.state.materiaAtual}) }>
							<Form.Group>
								<Form.Label>Cadastre a matéria</Form.Label>
								<Form.Control required type="text" placeholder="Matéria" value={this.state.materiaAtual} onChange={this.handleChange}>									
								</Form.Control>
							</Form.Group>
							<div class="button">
								<Button  type="submit" variant="dark">Cadastrar</Button>
							</div>
						</Form>
					</Container>

					<Container class='table'>
						<BootstrapTable 
							keyField='id' 
							data={this.state.materias} 
							selectRow={{mode:'radio', style:{background:'red'},
							onSelect:(row, isSelect, rowIndex, event) => {this.handleSelect(rowIndex)} }}
							columns={ [{dataField:'id', text:'ID'}, {dataField:'materia', text:"Matérias"}]}/>
							<div class="button">
								<Button variant="danger" onClick={this.handleDelete}>Deletar</Button>
							</div>
					</Container>
				</section>
			</React.Fragment>
		);
	}
}