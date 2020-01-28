import deepmerge from 'deepmerge';

const common = {
	identity: {
		response_type: 'code',
		scope: 'openid profile',
		oidc_path: '/static/oidc.html',
		automaticSilentRenew:true,
		validateSubOnSilentRenew: true,
		loadUserInfo: false,
	},
};
const dev = {
	hosts: {
		api_path: 'https://chorizo.api.devhost.dev',
		idp_path: 'https://login.devhost.dev',
	},
	identity: {
		client_id: 'invalid_id',
	},
};
const production = {
	hosts: {
		api_path: 'https://chorizo.api.greenstuff.io',
		idp_path: 'https://login.greenstuff.io',
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