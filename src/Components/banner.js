import React from 'react';
import Card from 'react-bootstrap/Card';

export default function Banner(props){
	return(
		<a href={props.url}>
			<Card className="bg-dark text-white" style={{ width: '500px'}}>
	  			<Card.Img src={props.image} alt="Card image" />
	  			<Card.ImgOverlay>
	    			<Card.Title>{props.title}</Card.Title>
	  			</Card.ImgOverlay>
			</Card>
		</a>		
	);
}