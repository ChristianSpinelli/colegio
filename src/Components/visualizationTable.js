import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'react-bootstrap/Button';

export default function VisualTable(props){
	return (
		<React.Fragment>
			<BootstrapTable 
				keyField='id' 
				data={props.data}
				columns={ props.columns }/>
		</React.Fragment>
	);
}