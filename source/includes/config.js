import deepmerge from 'deepmerge';

const common = {
	identity: {
		response_type: 'code',
		scope: 'openid profile',
		oidc_path: '/oauth',
		automaticSilentRenew:true,
		validateSubOnSilentRenew: true,
		loadUserInfo: false,
	},
};
const dev = {
	hosts: {
		api_path: 'https://chorizo-api.devhost.dev',
		idp_path: 'https://login.devhost.dev',
		app_path: 'https://chorizo.devhost.dev'
	},
	identity: {
		client_id: 'NqDPNEV7Sa6vH-lFbCJwBA',
	},
};
const production = {
	hosts: {
		api_path: 'https://chorizo-api.greenstuff.io',
		idp_path: 'https://login.greenstuff.io',
		app_path: 'https://chorizo.greenstuff.io'
	},
	identity: {
		client_id: 'invalid_id',
	},
};

const MergedConfig = deepmerge.all([
	common,
	(process.env.production? production : dev),
]);

export default MergedConfig;