import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { Container, Heading, Text } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FC } from 'react';

interface INotFoundPageProps {}

const NotFoundPage: FC<INotFoundPageProps> = ({ ...rest }) => {
	return (
		<MainLayout navigation={<MainNavigation />}>
			<Container maxW="container.xl" mt={16}>
				<Heading as="h2" textAlign="center">
					404
				</Heading>

				<Text textAlign="center">This page cannot be found</Text>
			</Container>
		</MainLayout>
	);
};

export const getStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(String(locale), ['common'])),
		},
	};
};

export default NotFoundPage;
