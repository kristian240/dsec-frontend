import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { Heading } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import ReadMore from '../ReadMore';
import Tip from '../Tip';
import { Topics } from '../Topic';

interface WikiPageProps {
	title: string;
	content: Array<{
		title: string;
		description: string;
	}>;
	topic: Topics;
}

const WikiPage: React.FC<WikiPageProps> = ({ title, content, topic }) => {
	const accentColor = useMemo(() => {
		switch (topic) {
			case Topics.Requirements:
				return '#4042E2';
			case Topics.Design:
				return '#FF8077';
			case Topics.Deployment:
				return '#F29A33';
			case Topics.Testing:
				return '#A13976';
			case Topics.Development:
				return '#7D97F4';
		}
	}, [topic]);

	return (
		<MainLayout navigation={<MainNavigation />}>
			<Heading as="h1" className="albra" py="200" textAlign="center" w="100%" bgColor={accentColor} color="#fff">
				{title}
			</Heading>
			{content.map((item, index) => (
				<Tip key={index} {...item} index={index} align={index % 2 === 0 ? 'left' : 'right'} accentColor={accentColor} />
			))}
			<ReadMore activeTopic={topic} />
		</MainLayout>
	);
};

export default WikiPage;
