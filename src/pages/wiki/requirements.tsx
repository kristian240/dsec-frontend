import ReadMore from '@/components/wiki/ReadMore';
import Tip from '@/components/wiki/Tip';
import { Topics } from '@/components/wiki/Topic';
import WikiPage from '@/components/wiki/WikiPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

const RequirementsPage = () => {
	const accentColor = '#4042E2';

	return (
		<WikiPage title="Requirements" accentColor={accentColor}>
			<Tip
				title="Include security as a requirement"
				description="Make security a requirement for the project from the outset by including it in the project scope and objectives"
				align={'left'}
				index={1}
			/>
			<Tip
				title="Identify and assess risks"
				description="Identify the potential security risks associated with the project and determine how they will be mitigated."
				align={'right'}
				index={2}
				accentColor={accentColor}
			/>
			<Tip
				title="Develop a security plan"
				description="Create a plan that outlines the specific security measures that will be implemented during the project."
				align={'left'}
				index={3}
			/>
			<Tip
				title="Allocate resources"
				description="Ensure that sufficient resources (e.g., budget, personnel) are allocated to address security needs.Ensure that sufficient resources (e.g., budget, personnel) are allocated to address security needs."
				align={'right'}
				index={4}
				accentColor={accentColor}
			/>
			<Tip
				title="Involve security personnel"
				description="Involve security personnel (e.g., security analysts, penetration testers) in the planning process to ensure that all security considerations are taken into account."
				align={'left'}
				index={5}
			/>
			<ReadMore activeTopic={Topics.Requirements} />
		</WikiPage>
	);
};

export const getStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(String(locale), ['common'])),
		},
	};
};

export default RequirementsPage;
