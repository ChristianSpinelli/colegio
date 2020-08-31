import React from 'react';
import Card from 'react-bootstrap/Card';

export default function Banner(props){
	return(
			<Card className="bg-dark text-white" style={{ width: '600px'}}>
  				<Card.Img src={props.image} alt="Card image" />
  				<Card.ImgOverlay>
    				<Card.Title>{props.title}</Card.Title>
    				 <Card.Link href={props.url}>Card Link</Card.Link>
  				</Card.ImgOverlay>
			</Card>
		);
}