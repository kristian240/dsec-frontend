declare global {
	namespace NodeJS {
		interface ProcessEnv {
			/** env for local api proxy */
			API_PROXY_ENV: 'production' | 'development';
			/** url used to change the base url for making API calls to the server */
			API_BASE_URL: string;

			// Vercel env vars
			VERCEL_URL: string;
		}
	}
}

export {};
