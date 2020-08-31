import React from 'react';
import Home from './UI/home';
import TelaAluno from './UI/aluno';
import TelaTurma from './UI/turma';
import TelaProfessor from './UI/professor';
import TelaMateria from './UI/materia';
import TelaProva from './UI/prova';
import TelaNota from './UI/nota';
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
				</Switch>
			</BrowserRouter>
						
			);
	}
}