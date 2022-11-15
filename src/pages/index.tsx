import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { Container, Heading } from '@chakra-ui/react';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import path from 'path';

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
	console.log('trans.init', (await serverSideTranslations(String(locale), ['common']))._nextI18Next.initialI18nStore);
	console.log('trans.user', (await serverSideTranslations(String(locale), ['common']))._nextI18Next.userConfig);
	console.log('path', path.resolve(process.cwd(), `${'./public/locales'}/${locale}`));
	console.log('patNew?', path.resolve(process.cwd(), `${'./locales'}/${locale}`));

	return {
		props: {
			...(await serverSideTranslations(String(locale), ['common'])),
		},
	};
};

export default Home;
