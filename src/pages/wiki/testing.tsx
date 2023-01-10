import ReadMore from '@/components/wiki/ReadMore';
import Tip from '@/components/wiki/Tip';
import { Topics } from '@/components/wiki/Topic';
import WikiPage from '@/components/wiki/WikiPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

const TestingWikiPage = () => {
	const accentColor = '#A13976';

	return (
		<WikiPage title="Testing" accentColor={accentColor}>
			<Tip
				title="Perform security testing"
				description="Test the software specifically for security vulnerabilities and issues. This can include testing for vulnerabilities such as cross-site scripting (XSS) and SQL injection."
				align={'left'}
				index={1}
			/>
			<Tip
				title="Use a DAST tool"
				description="A dynamic application security testing (DAST) tool can automatically check running software for vulnerabilities."
				align={'right'}
				index={2}
				accentColor={accentColor}
			/>
			<Tip
				title="Use a SAST tool: "
				description="A static application security testing (SAST) tool can automatically check the source code for vulnerabilities."
				align={'left'}
				index={3}
			/>
			<Tip
				title="Perform penetration testing"
				description="A penetration test (pen test) is an authorized simulated attack performed on a computer system to evaluate its security. There are serveral existing tools that can do this autmatically for you."
				align={'right'}
				index={4}
				accentColor={accentColor}
			/>
			<Tip
				title="Conduct a code review"
				description="Have a team of developers or security experts manually review the code for security issues."
				align={'left'}
				index={5}
			/>
			<ReadMore activeTopic={Topics.Testing} />
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

export default TestingWikiPage;
