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

interface WikiPageLayoutProps {
	title: string;
  children: React.ReactNode;
}

const WikiPageLayout: FC<WikiPageLayoutProps> = ({ title, children }) => {
  return (
		<MainLayout navigation={<MainNavigation />}>
			<Heading as="h1" className="albra" py="200" textAlign="center" w="100%" bgColor={accentColor} color="#fff">
				{title}
			</Heading>
			
      {children}

			<ReadMore activeTopic={topic} />
		</MainLayout>
	);
}

export default WikiPage;
