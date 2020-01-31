import React from "react";
import {
	Switch,
	Route,
} from "react-router-dom";

import TabBar from "Component/TabBar";

export const DefaultPage = (props) => (
	<React.Fragment>
		<TabBar tabs={[
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
		</TabBar>
	</React.Fragment>
);
export default DefaultPage;