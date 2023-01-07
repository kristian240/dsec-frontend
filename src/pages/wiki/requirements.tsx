import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import ReadMore from '@/components/wiki/ReadMore';
import Tip from '@/components/wiki/Tip';
import WikiPage from '@/components/wiki/WikiPage';
import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

const RequirementsPage = () => {
	const content = [
		{
			title: 'Include security as a requirement',
			description:
				'Make security a requirement for the project from the outset by including it in the project scope and objectives',
		},
		{
			title: 'Identify and assess risks',
			description:
				'Identify the potential security risks associated with the project and determine how they will be mitigated.',
		},
		{
			title: 'Develop a security plan',
			description:
				'Create a plan that outlines the specific security measures that will be implemented during the project.',
		},
		{
			title: 'Allocate resources',
			description:
				'Ensure that sufficient resources (e.g., budget, personnel) are allocated to address security needs.Ensure that sufficient resources (e.g., budget, personnel) are allocated to address security needs.',
		},
		{
			title: 'Involve security personnel',
			description:
				'Involve security personnel (e.g., security analysts, penetration testers) in the planning process to ensure that all security considerations are taken into account.',
		},
	];

	const accentColor = '#4042E2';

	return <WikiPage title="Requirements" content={content} accentColor={accentColor} />;
};

export const getStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(String(locale), ['common'])),
		},
	};
};

export default RequirementsPage;
