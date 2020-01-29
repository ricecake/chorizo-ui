import { createUserManager } from 'redux-oidc';
import MergedConfig from 'Include/config';

const basePath = window.location.origin;

const userManagerConfig = {
	...MergedConfig.identity,
	authority: MergedConfig.hosts.idp_path,
	redirect_uri: MergedConfig.hosts.app_path + MergedConfig.identity.oidc_path +'?mode=normal',
	silent_redirect_uri: MergedConfig.hosts.app_path + MergedConfig.identity.oidc_path +'?mode=silent',
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
