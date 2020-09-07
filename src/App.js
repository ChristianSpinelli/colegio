import React from 'react';
import Home from './UI/home';
import TelaAluno from './UI/aluno';
import TelaTurma from './UI/turma';
import TelaProfessor from './UI/professor';
import TelaMateria from './UI/materia';
import TelaProva from './UI/prova';
import TelaNota from './UI/nota';
import TelaAno from './UI/ano';
import Operations from './UI/operations';
import Cadastro from './UI/cadastro';
import TelaAta from './UI/ata';
import { BrowserRouter, Route, Switch } from "react-router-dom";


export default class App extends React.Component{
	render(){
		return (
			<BrowserRouter>
				<Switch>
					<Route path='/' component={Home} exact/>
					<Route path='/home' component={Home}/>
					<Route path='/aluno' component={TelaAluno}/>
					<Route path='/turma' component={TelaTurma}/>
					<Route path='/professor' component={TelaProfessor}/>
					<Route path='/materia' component={TelaMateria}/>
					<Route path='/prova' component={TelaProva}/>
					<Route path='/nota' component={TelaNota}/>
					<Route path='/ano' component={TelaAno}/>
					<Route path='/operations' component={Operations}/>
					<Route path='/cadastro' component={Cadastro}/>
					<Route path='/ata' component={TelaAta}/>
				</Switch>
			</BrowserRouter>
						
			);
	}
}