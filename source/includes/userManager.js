import { createUserManager } from 'redux-oidc';


var url = window.location.origin;
const userManagerConfig = {
	authority: url,
	response_type: 'code',
	scope: 'openid profile',
	redirect_uri: url + '/static/oidc.html?mode=normal',
	silent_redirect_uri: url + '/static/oidc.html?mode=silent',
	automaticSilentRenew:true,
	validateSubOnSilentRenew: true,
	loadUserInfo: false,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;