import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { Heading } from '@chakra-ui/react';
import React from 'react';
import ReadMore from '../ReadMore';
import Tip from '../Tip';

interface WikiPageProps {
	title: string;
	content: Array<{
		title: string;
		description: string;
	}>;
	accentColor: string;
}

const WikiPage: React.FC<WikiPageProps> = ({ title, content, accentColor }) => {
	return (
		<MainLayout navigation={<MainNavigation />}>
			<Heading as="h1" className="albra" py="200" textAlign="center" w="100%" bgColor={accentColor} color="#fff">
				{title}
			</Heading>
			{content.map((item, index) => (
				<Tip key={index} {...item} index={index} align={index % 2 === 0 ? 'left' : 'right'} accentColor={accentColor} />
			))}
			<ReadMore />
		</MainLayout>
	);
};

export default WikiPage;
