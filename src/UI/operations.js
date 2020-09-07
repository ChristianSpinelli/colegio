import React from 'react';
import Header from '../Components/header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Banner from '../Components/banner';
import './telas.css';

export default class Operations extends React.Component{
	render(){
		return(
			<React.Fragment>
				<section class='header'>
					<Header/>
				</section>

				<section class ='content'>
					<Container>
						<Row>
							<div class='col'>
								<Col><Banner image='./boletim grande.jpg' title='Boletim' url='/boletim'/></Col>
							</div>
							<div class='col'>
								<Col><Banner image='./ata grande.jpg' title='Ata Geral' url='/ata'/></Col>
							</div>									
						</Row>
						<Row>
							<div class='col'>
								<Col><Banner image='./relatorio grande.jpg' title='Relatório Geral' url='/relatorio'/></Col>
							</div>								
						</Row>
					</Container>
				</section>
			</React.Fragment>
		);
	}
}