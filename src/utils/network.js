const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/api/api-proxy';

const defaultHeaders = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Credentials': 'true',
};

export const baseFetch = async (endpoint, fetchOptions) => {
	const res = await fetch(`${BASE_URL}${endpoint}`, Object.assign({}, { credentials: 'include' }, fetchOptions));

	if (res.status >= 400) {
		return res.json();
	}

	return res.json();
};

export const get = (endpoint, fetchOptions = {}) => {
	const reqOptions = Object.assign({}, fetchOptions, {
		method: 'GET',
		headers: Object.assign({}, defaultHeaders, fetchOptions.headers),
	});

	return baseFetch(endpoint, reqOptions);
};

export const post = (endpoint, body = {}, fetchOptions = {}) => {
	const reqOptions = Object.assign({}, fetchOptions, {
		method: 'POST',
		headers: Object.assign({}, defaultHeaders, fetchOptions.headers),
		body: JSON.stringify(body),
	});

	return baseFetch(endpoint, reqOptions);
};

export const update = (endpoint, body = {}, fetchOptions = {}) => {
	const reqOptions = Object.assign({}, fetchOptions, {
		method: 'PATCH',
		headers: Object.assign({}, defaultHeaders, fetchOptions.headers),
		body: JSON.stringify(body),
	});

	return baseFetch(endpoint, reqOptions);
};

export const destroy = (endpoint, fetchOptions = {}) => {
	const reqOptions = Object.assign({}, fetchOptions, {
		method: 'DELETE',
		headers: Object.assign({}, defaultHeaders, fetchOptions.headers),
	});

	return baseFetch(endpoint, reqOptions);
};
