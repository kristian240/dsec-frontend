import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { Container, Heading } from '@chakra-ui/react';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type HomeProps = Partial<InferGetServerSidePropsType<typeof getServerSideProps>>;

const Home: NextPage<HomeProps> = () => {
	const { t } = useTranslation();

	return (
		<MainLayout navigation={<MainNavigation />}>
			<Container maxW="container.xl" mt={16}>
				<Heading as="h2" textAlign="center">
					{t('home.title')}
				</Heading>
			</Container>
		</MainLayout>
	);
};

export const getServerSideProps = async ({ locale }) => {
	console.log('locale', locale);

	console.log('trans', (await serverSideTranslations(String(locale), ['common']))._nextI18Next);

	return {
		props: {
			...(await serverSideTranslations(String(locale), ['common'])),
		},
	};
};

export default Home;
