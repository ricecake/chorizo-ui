import store from 'Include/store';
import MergedConfig from 'Include/config';

function deepGet (obj, properties) {
	if (obj === undefined || obj === null) {
		return;
	}

	if (properties.length === 0) {
		return obj;
	}

	var foundSoFar = obj[properties[0]];
	var remainingProperties = properties.slice(1);

	return deepGet(foundSoFar, remainingProperties);
}

const call = ({url, args = {}, method = "POST"}) => {
	const token = deepGet(store.getState(), ['oidc', 'user', 'access_token']);
	if (!token) {
		return Promise.reject(new Error('No Credentials'));
	}


	let path = new URL(url, MergedConfig.hosts.api_path);
	return fetch(path, {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify(args),
	}).then(result => result.json());
};

export default call;