import { createActions, handleActions } from 'redux-actions';
import { MakeMerge } from "Include/reducers/helpers";
import userManager from 'Include/userManager';

const defaultState = {
	signedIn: false,
	error: undefined,
};


export const startSignin = (state) => (dispatch, getState) => {
	userManager.signinRedirect({ state: JSON.stringify(state) });
	return;
};

export const { logout, signinSuccess, signinError } = createActions({
	logout: ()=>({}),
	signinSuccess: (user)=>(JSON.parse(user.state)),
	signinError:(error = "")=>({ error }),
}, { prefix: "chorizo/identity" });

const reducer = handleActions({
	[logout]: (state, payload) => merge(state, { signedIn: false }),
	[signinSuccess]: (state, { payload }) => merge(state, { signedIn: true, ...payload }),
	[signinError]: (state, {payload: { error }}) => merge(state, { error: error, signedIn: false }),
}, defaultState);

const merge = MakeMerge();

export default reducer;