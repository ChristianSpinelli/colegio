import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'react-bootstrap/Button';

export default function Table(props){
	return (
		<React.Fragment>
			<BootstrapTable 
				keyField='id' 
				data={props.data} 
				selectRow={{mode:'radio', style:{background:'red'},
				onSelect:(row, isSelect, rowIndex, event) => { props.select(rowIndex) }}}
				columns={ props.columns }/>
			<div class="button">
				<Button variant="danger" onClick={props.delete}>Deletar</Button>
			</div>
		</React.Fragment>
	);
}