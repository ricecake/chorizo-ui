import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';

import store from 'Include/store';
import userManager from 'Include/userManager';

import App from "Page/index";

ReactDOM.render((
	<Provider store={store}>
		<OidcProvider store={store} userManager={userManager}>
			<App />
		</OidcProvider>
	</Provider>
), document.body);
