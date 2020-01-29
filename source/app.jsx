import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';

import store from 'Include/store';
import userManager from 'Include/userManager';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	withRouter,
} from "react-router-dom";

import App from "Page/index";
import Oauth from "Page/oauth";

const RouterApp = withRouter(App);


ReactDOM.render((
	<Provider store={store}>
		<OidcProvider store={store} userManager={userManager}>
			<Router>
				<Switch>
					<Route path="/oauth">
						<Oauth />
					</Route>
					<Route path="/">
						<RouterApp />
					</Route>
				</Switch>
			</Router>
		</OidcProvider>
	</Provider>
), document.body);
