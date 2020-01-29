import React from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import userManager from "Include/userManager";

import { Redirect } from "react-router-dom";

import { signinSuccess, signinError } from "Include/reducers/identity";
import { bindActionCreators } from 'redux'


class CallbackPage extends React.Component {
	render(props) {
		if (this.props.signedIn)  {
			return (<Redirect to={ this.props.redirect_to } />);
		}

		return (
			<CallbackComponent
				userManager={userManager}
				successCallback={ user => this.props.signinSuccess(user) }
				errorCallback={ error => this.props.signinError(error) }
			>
				<div>Redirecting...</div>
			</CallbackComponent>
		);
	}
}

const stateToProps = ({ oidc, identity }) => ({
	userLoading: oidc.isLoadingUser,
	signedIn: identity.signedIn,
	redirect_to: identity.redirect_to,
});
const dispatchToProps = (dispatch) => bindActionCreators({ signinSuccess, signinError }, dispatch);

export default connect(stateToProps, dispatchToProps)(CallbackPage);
