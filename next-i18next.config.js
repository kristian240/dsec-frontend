/**
 * @type {import('i18next').InitOptions & Required<Pick<import('next').NextConfig, 'i18n'>>}
 */
module.exports = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
		localePath: './locales',
	},
	react: { useSuspense: true },
};
