import { Topics } from '@/components/wiki/Topic';
import WikiPage from '@/components/wiki/WikiPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

const DevelopmentWikiPage = () => {
	const content = [
		{
			title: 'Implement security controls',
			description:
				'Incorporate security measures into the software to protect against identified threats. This can include measures such as input validation, authentication and authorization, and encryption.',
		},
		{
			title: 'Use secure coding practices',
			description:
				'Follow best practices for writing secure code, such as properly handling errors and exceptions, avoiding the use of hard-coded passwords, and sanitizing user input.',
		},
		{
			title: 'Use a static code analyzer',
			description:
				'Use a tool that automatically checks the code for vulnerabilities and security issues. The DSEC tool can help you set this up for various programming languages.',
		},
		{
			title: 'Use libraries and frameworks',
			description:
				'Leverage existing libraries and frameworks that provide built-in security features, such as input validation and output encoding.',
		},
		{
			title: 'Use a secure development environment',
			description:
				'Use a development environment that is configured with secure settings and tools to help prevent security breaches.',
		},
	];

	return <WikiPage content={content} title={'Development'} topic={Topics.Development} />;
};

export const getStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(String(locale), ['common'])),
		},
	};
};

export default DevelopmentWikiPage;
