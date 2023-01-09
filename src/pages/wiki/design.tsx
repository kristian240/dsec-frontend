import ReadMore from '@/components/wiki/ReadMore';
import Tip from '@/components/wiki/Tip';
import { Topics } from '@/components/wiki/Topic';
import WikiPage from '@/components/wiki/WikiPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

const DesignWikiPage = () => {
	const accentColor = '#FF8077';
	return (
		<WikiPage title="Design" accentColor={accentColor}>
			<Tip
				title="Conduct a threat modeling exercise"
				description="Identify the potential threats that the software may be exposed to and determine how they will be mitigated."
				align={'left'}
				index={1}
			/>
			<Tip
				title="Design for security"
				description="Consider security at every step of the design process and ensure that the software is designed to be secure."
				align={'right'}
				index={2}
				accentColor={accentColor}
			/>
			<Tip
				title="Use secure design patterns"
				description='Leverage design patterns that have been proven to be secure, such as the "principle of least privilege" and "fail-safe defaults".'
				align={'left'}
				index={3}
			/>
			<Tip
				title="Use a design review"
				description="Have a team of developers or security experts review the design to ensure that it is secure."
				align={'right'}
				index={4}
				accentColor={accentColor}
			/>
			<ReadMore activeTopic={Topics.Design} />
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

export default DesignWikiPage;
