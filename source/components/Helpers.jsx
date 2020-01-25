import React from 'react';

export const Hide = ({ If: condition, children }) => {
	console.log(condition);
	if ( condition ) {
		return null;
	}

	return (
		<React.Fragment>
			{ children }
		</React.Fragment>
	);
};

export const Show = ({ If: condition, children }) => <Hide If={!condition}> { children } </Hide>;