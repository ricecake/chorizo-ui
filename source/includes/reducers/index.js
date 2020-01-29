import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';

import identityReducer from "Include/reducers/identity";

const reducer = combineReducers({
	oidc: oidcReducer,
	identity: identityReducer,
});

export default reducer;
