import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type HomeProps = Partial<InferGetServerSidePropsType<typeof getServerSideProps>>;

const Home: NextPage<HomeProps> = () => {
	const { t } = useTranslation();

	return (
		<Box bg="blue.100" py={8}>
			<Container maxW="container.lg">
				<Heading as="h1">{t('home.title')}</Heading>
			</Container>
		</Box>
	);
};

export const getServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(String(locale), ['common'])),
		},
	};
};

export default Home;
