import React from 'react';
import Header from '../Components/header';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import VisualTable from '../Components/visualizationTable';
import './telas.css';



export default class TelaRelatorio extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			anos:[],
			turmas:[],
			notas:[],
			mediasAno:[],
			mediasTurma:[]
		}
	}

	componentWillMount(){
		let anos = [];
		if(localStorage.getItem('anos')){
			anos = JSON.parse(localStorage.getItem('anos'));
			if(anos.length > 0){
				this.setState({
					anos:anos
				})
			}
		}

		let notas = [];
		if(localStorage.getItem('notas')){
			notas = JSON.parse(localStorage.getItem('notas'));
			if(notas.length > 0){
				this.setState({
					notas:notas
				})
			}
		}

		let turmas = [];
		if(localStorage.getItem('turmas')){
			turmas = JSON.parse(localStorage.getItem('turmas'));
			if(turmas.length > 0){
				this.setState({
					turmas:turmas
				})
			}
		}

		//medias Ano
		let sum = 0;
		let count = 0;
		let mediasAno = [];
		let result = 0; 
		for(let i = 0; i < anos.length; i++){
			sum = notas.reduce((sum, nota) =>{
				if(nota.aluno.turma.ano.ano === anos[i].ano){
					count++;
					result = sum + parseInt(nota.nota,10);
				}
				return result;
			},0);
			

			if(count>0){
				mediasAno[i] = {media:sum/count, ano:anos[i], count:count};
			}else{
				mediasAno[i] ={media:0, ano:anos[i], count:0};
			}
			
			count = 0;
			result = 0;
		}


		
		//medias turma
		count = 0;
		sum = 0;
		result = 0;
		let mediasTurma = [];
		for(let i = 0; i < turmas.length; i++){
			sum = notas.reduce((sum, nota) => {
				if(nota.aluno.turma.ano.ano+" "+nota.aluno.turma.turma === turmas[i].ano.ano+" "+turmas[i].turma){
					count++;
					result = sum + parseInt(nota.nota,10);
				}
				return result;
			}, 0);
			
			if(count>0){
				mediasTurma[i] = {media:sum/count, turma:turmas[i], count:count};
			}else{
				mediasTurma[i] ={media:0, turma:turmas[i], count:0};
			}
			
			count = 0;
			result = 0;
		}

		
		

		this.setState({
			mediasAno:mediasAno,
			mediasTurma:mediasTurma
		})
	}


	render(){
		return(
			<React.Fragment>
				<section class='header'>
					<Header/>
				</section>

				<section class='content'>
					<Container class='table-anos'>
						<h2>Tabela de Média por Ano</h2>
						<VisualTable
							data={this.state.mediasAno}
							columns={[
								{dataField:'ano.id', text:'ID Ano'},
								{dataField:'ano.ano', text:'Ano'},
								{dataField:'count', text:'Quantidade de Notas'},
								{dataField:'media', text:'Média'}]}>
						</VisualTable>
					</Container>
					<Container class='table-turmas'>
						<h2>Tabela de Média por Turma</h2>
						<VisualTable
							data={this.state.mediasTurma}
							columns={[
								{dataField:'turma.ano.id', text:'ID Ano'},
								{dataField:'turma.ano.ano', text:'Ano'},
								{dataField:'turma.id', text:'ID Turma'},
								{dataField:'turma.turma', text:'Turma'},
								{dataField:'count', text:'Quantidade de Notas'},
								{dataField:'media', text:'Média'}]}>
						</VisualTable>
					</Container>
				</section>
			</React.Fragment>
		);
	}
}