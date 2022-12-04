import { AuthRedirect } from '@/components/AuthRedirect/AuthRedirect';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { Container } from '@chakra-ui/react';
import { InferGetStaticPropsType, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type ProfilePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProfilePage: NextPage<ProfilePageProps> = () => {
	return (
		<MainLayout navigation={<MainNavigation />}>
			<AuthRedirect to="/login" />

			<Container maxW="container.lg" mt={16}>
				<DashboardHeader />
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

export default ProfilePage;
