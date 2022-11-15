import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { Container, Heading } from '@chakra-ui/react';
import { existsSync } from 'fs';
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
	// Some issue with Vercel and Next.js i18n. This is a workaround.
	existsSync(path.resolve(process.cwd(), `${'./public/locales'}/${locale}`));

	return {
		props: {
			...(await serverSideTranslations(String(locale), ['common'])),
		},
	};
};

export default Home;
