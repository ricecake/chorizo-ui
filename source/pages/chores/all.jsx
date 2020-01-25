import React from "react";
import {
	Switch,
	Route,
} from "react-router-dom";

import Header from "Component/Header";

export const All = (props) => (
	<React.Fragment>
		<Header title="All" tabs={[
			{ label: "Parrots", value:"" },
			{ label: "Cat" },
			{ label: "Dog" },
		]}>
			<Switch>
				<Route path="/Cat">
					<h1>Cats</h1>
				</Route>
				<Route path="/Dog">
					<h1>Dogs</h1>
				</Route>
				<Route path="/">
					<h1>Parrots!</h1>
				</Route>
			</Switch>
		</Header>
	</React.Fragment>
);
export default All;