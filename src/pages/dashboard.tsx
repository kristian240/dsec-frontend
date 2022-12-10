import { AuthRedirect } from '@/components/AuthRedirect/AuthRedirect';
import { AddAnalysis } from '@/components/dashboard/AddAnalysis';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardRepoList } from '@/components/dashboard/DashboardRepoList';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { Container, Flex } from '@chakra-ui/react';
import { InferGetStaticPropsType, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type ProfilePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProfilePage: NextPage<ProfilePageProps> = () => {
	return (
		<MainLayout navigation={<MainNavigation />}>
			<AuthRedirect to="/login" />

			<Container maxW="container.lg" mt={16}>
				<DashboardHeader mb={16} />

				<DashboardRepoList minH="160px" mb={16} />

				<Flex justify="center">
					<AddAnalysis />
				</Flex>
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
