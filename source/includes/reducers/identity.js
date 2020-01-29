import { createActions, handleActions, combineActions } from 'redux-actions';
import { MakeMerge } from "Include/reducers/helpers";
import userManager from 'Include/userManager';

const defaultState = {
	signedIn: false,
	error: undefined,
};


export const startSignin = () => (dispatch, getState) => {
	userManager.signinRedirect();
	return;
};

export const { logout, signinSuccess, signinError } = createActions({
	logout: ()=>({}),
	signinSuccess: ()=>({}),
	signinError:(error = "")=>({ error }),
}, { prefix: "chorizo/identity" });

const reducer = handleActions({
	[logout]: (state, payload) => merge(state, { signedIn: false }),
	[signinSuccess]: (state, payload) => merge(state, { signedIn: true }),
	[signinError]: (state, {payload: { error }}) => merge(state, { error: error, signedIn: false }),
}, defaultState);

const merge = MakeMerge();

export default reducer;