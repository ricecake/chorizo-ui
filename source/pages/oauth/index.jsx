import React from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import userManager from "Include/userManager";

import { Redirect } from "react-router-dom";

import { signinSuccess, signinError } from "Include/reducers/identity";
import { bindActionCreators } from 'redux'


class CallbackPage extends React.Component {
	render(props) {
		// just redirect to '/' in both cases for now
		if (this.props.signedIn)  {
			return (<Redirect to="/"/>);
		}
			return (
				<CallbackComponent
					userManager={userManager}
					successCallback={() => this.props.signinSuccess() }
					errorCallback={error => this.props.signinError(error) }
				>
					<div>Redirecting...</div>
				</CallbackComponent>
			);
		}
}

const stateToProps = ({ oidc, identity }) => ({userLoading: oidc.isLoadingUser, signedIn: identity.signedIn});
const dispatchToProps = (dispatch) => bindActionCreators({ signinSuccess, signinError }, dispatch);

export default connect(stateToProps, dispatchToProps)(CallbackPage);
