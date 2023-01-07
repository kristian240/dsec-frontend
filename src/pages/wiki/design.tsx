import WikiPage from '@/components/wiki/WikiPage';
import React from 'react';

const DesignWikiPage = () => {
	const content = [
		{
			title: 'Conduct a threat modeling exercise',
			description:
				'Identify the potential threats that the software may be exposed to and determine how they will be mitigated.',
		},
		{
			title: 'Design for security',
			description:
				'Consider security at every step of the design process and ensure that the software is designed to be secure.',
		},
		{
			title: 'Use secure design patterns',
			description:
				'Implement security controls (e.g., authentication, authorization, encryption) to protect the software from threats.Leverage design patterns that have been proven to be secure, such as the "principle of least privilege" and "fail-safe defaults".',
		},
		{
			title: 'Use a design review',
			description: 'Have a team of developers or security experts review the design to ensure that it is secure.',
		},
	];

	return <WikiPage title={'Design'} content={content} accentColor={'#FF8077'} />;
};

export default DesignWikiPage;
