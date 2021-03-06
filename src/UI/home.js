import React from 'react';
import Header from '../Components/header';
import Banner from '../Components/banner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './telas.css';

export default class Home extends React.Component{
	render(){
		return(
			<React.Fragment>
				<section class='header'>
					<Header/>
				</section>

				<section class='content'>
					<Container class='grid'>
						<Row>
							<div class='col'>
								<Col><Banner image='./registro grande.jpg' title='Cadastro' url='/cadastro'/></Col>
							</div>
							<div class='col'>
								<Col><Banner image='./operacoes grande.jpg' title='Operações' url='/operations'/></Col>
							</div>									
						</Row>
					</Container>
				</section>
			</React.Fragment>
		);
	}
}