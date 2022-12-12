import { AuthRedirect } from '@/components/AuthRedirect/AuthRedirect';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { RepoDetailsSection } from '@/components/repo/RepoDetailsSection';
import { RepoJobsSection } from '@/components/repo/RepoJobsSection';
import { Box, Container } from '@chakra-ui/react';
import { GetStaticPropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type ProfilePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ProfilePage: NextPage<ProfilePageProps> = ({ repoId }) => {
	return (
		<MainLayout navigation={<MainNavigation />}>
			<AuthRedirect to="/login" />

			<Box bgColor="primary.50" py={4}>
				<Container maxW="container.lg" mt={16}>
					<RepoDetailsSection repoId={repoId} mb={16} />
				</Container>
			</Box>

			<Container maxW="container.lg" mt={16}>
				<RepoJobsSection repoId={repoId} />
			</Container>
		</MainLayout>
	);
};

export const getServerSideProps = async ({ locale, params }: GetStaticPropsContext) => {
	return {
		props: {
			...(await serverSideTranslations(String(locale), ['common'])),
			repoId: params.id as string,
		},
	};
};

export default ProfilePage;
