import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { Heading } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

interface WikiPageLayoutProps {
	title: string;
	children: ReactNode;
	accentColor: string;
}

const WikiPageLayout: FC<WikiPageLayoutProps> = ({ title, children, accentColor }) => {
	return (
		<MainLayout navigation={<MainNavigation />}>
			<Heading as="h1" className="albra" py="200" textAlign="center" w="100%" bgColor={accentColor} color="#fff">
				{title}
			</Heading>
			{children}
		</MainLayout>
	);
};

export default WikiPageLayout;
