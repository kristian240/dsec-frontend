import { Topics } from '@/components/wiki/Topic';
import WikiPage from '@/components/wiki/WikiPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

const TestingWikiPage = () => {
	const content = [
		{
			title: 'Perform security testing',
			description:
				'Test the software specifically for security vulnerabilities and issues. This can include testing for vulnerabilities such as cross-site scripting (XSS) and SQL injection.',
		},
		{
			title: 'Use a DAST tool',
			description:
				'A dynamic application security testing (DAST) tool can automatically check running software for vulnerabilities.',
		},
		{
			title: 'Perform penetration testing',
			description:
				'A penetration test (pen test) is an authorized simulated attack performed on a computer system to evaluate its security. There are serveral existing tools that can do this autmatically for you.',
		},
		{
			title: 'Use a SAST tool: ',
			description:
				'A static application security testing (SAST) tool can automatically check the source code for vulnerabilities.',
		},
		{
			title: 'Conduct a code review',
			description: 'Have a team of developers or security experts manually review the code for security issues.',
		},
	];

	return <WikiPage content={content} topic={Topics.Testing} title="Testing" />;
};

export const getStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(String(locale), ['common'])),
		},
	};
};

export default TestingWikiPage;
