export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_PATH || 'http://localhost:3000/api/api-proxy';

const defaultHeaders = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Credentials': 'true',
};

export const baseFetch = async (endpoint: string, fetchOptions: RequestInit) => {
	const res = await fetch(`${BASE_URL}${endpoint}`, Object.assign({}, { credentials: 'include' }, fetchOptions));

	const data = res.headers.get('content-length') === '0' ? Promise.resolve({}) : res.json();

	if (res.status >= 400) {
		return Promise.reject(await data);
	}

	return data;
};

export const get = (endpoint: string, fetchOptions: RequestInit = {}) => {
	const reqOptions = Object.assign({}, fetchOptions, {
		method: 'GET',
		headers: Object.assign({}, defaultHeaders, fetchOptions.headers),
	});

	return baseFetch(endpoint, reqOptions);
};

export const post = (endpoint: string, body = {}, fetchOptions: RequestInit = {}) => {
	const reqOptions = Object.assign({}, fetchOptions, {
		method: 'POST',
		headers: Object.assign({}, defaultHeaders, fetchOptions.headers),
		body: JSON.stringify(body),
	});

	return baseFetch(endpoint, reqOptions);
};

export const update = (endpoint: string, body = {}, fetchOptions: RequestInit = {}) => {
	const reqOptions = Object.assign({}, fetchOptions, {
		method: 'PUT',
		headers: Object.assign({}, defaultHeaders, fetchOptions.headers),
		body: JSON.stringify(body),
	});

	return baseFetch(endpoint, reqOptions);
};

export const destroy = (endpoint: string, fetchOptions: RequestInit = {}) => {
	const reqOptions = Object.assign({}, fetchOptions, {
		method: 'DELETE',
		headers: Object.assign({}, defaultHeaders, fetchOptions.headers),
	});

	return baseFetch(endpoint, reqOptions);
};
