import ReadMore from '@/components/wiki/ReadMore';
import Tip from '@/components/wiki/Tip';
import { Topics } from '@/components/wiki/Topic';
import WikiPage from '@/components/wiki/WikiPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

const DeploymentWikiPage = () => {
	const accentColor = '#F29A33';

	return (
		<WikiPage title="Deployment" accentColor={accentColor}>
			<Tip
				title="Monitor and update security controls"
				description="Regularly monitor the software for security vulnerabilities and update security controls as needed to keep the software secure."
				align={'left'}
				index={1}
			/>
			<Tip
				title="Keep your secrets a secret"
				description="Be careful where you choose to store your secrets and never make them publicly available. If you do, change them immediately! The DSEC tool can help you check if you have any exposed secrets in your code."
				align={'right'}
				index={2}
				accentColor={accentColor}
			/>
			<Tip
				title="Use secure updates"
				description="Use secure methods for updating the software, such as signed update packages and secure communications channels."
				align={'left'}
				index={3}
			/>
			<Tip
				title="Monitor for security breaches"
				description="Use monitoring tools to detect and alert on potential security breaches."
				align={'right'}
				index={4}
				accentColor={accentColor}
			/>
			<Tip
				title="Respond to security incidents"
				description="Have a plan in place for responding to security incidents, including steps for containing the incident, mitigating the impact, and restoring the software to a secure state."
				align={'left'}
				index={5}
			/>
			<ReadMore activeTopic={Topics.Deployment} />
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

export default DeploymentWikiPage;
