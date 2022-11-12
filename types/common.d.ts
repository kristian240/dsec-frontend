declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_PROXY_ENV: 'production' | 'development';
			APP_DOMAIN: string;

			// Vercel env vars
			VERCEL_URL: string;
		}
	}
}

export {};
