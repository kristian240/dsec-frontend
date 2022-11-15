import { AuthRedirect } from '@/components/AuthRedirect/AuthRedirect';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { ProfileHeader } from '@/components/ProfileHeader';
import { UserDetailsSection } from '@/components/UserDetailsSection/UserDetailsSection';
import { Container } from '@chakra-ui/react';
import { InferGetStaticPropsType, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type ProfilePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProfilePage: NextPage<ProfilePageProps> = () => {
	return (
		<MainLayout navigation={<MainNavigation />}>
			<AuthRedirect to="/login" />

			<Container maxW="container.sm" mt={16}>
				<ProfileHeader />

				<UserDetailsSection mt={16} />
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
