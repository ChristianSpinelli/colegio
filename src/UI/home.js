import React from "react";
import Header from '../Components/header';
import Banner from '../Components/banner';
import "./home.css";


export default class Home extends React.Component{
	render(){
		return(
				<React.Fragment>
					<section class='header'>	
						<Header/>
					</section>

					<section class='content'>
						<Banner image='./students grande.jpg' title='Cadastro de Alunos'/>
					</section>

				</React.Fragment>
			);
	}
}