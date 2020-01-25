import React from "react";
import {
	HashRouter as Router,
	Switch,
	Route,
	withRouter,
} from "react-router-dom";

import Header from "Component/Header";

const RouteHeader = withRouter(Header);

export const All = (props) => (
	<div>
		<Router hashType="noslash">
			<RouteHeader title="All"/>
			<Switch>
				<Route path="/a">
					<h1>Cats</h1>
				</Route>
				<Route path="/b">
					<h1>Dogs</h1>
				</Route>
			</Switch>
		</Router>
	</div>
);
export default All;