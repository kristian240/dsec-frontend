import { AuthRedirect } from '@/components/AuthRedirect/AuthRedirect';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { GithubIcon } from '@/icon/GithubIcon';
import { Button } from '@chakra-ui/react';
import { existsSync } from 'fs';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import path from 'path';

export default function GithubPage() {
	return (
		<>
			<AuthRedirect to="/login" />

			<MainLayout
				navigation={<MainNavigation />}
				containerProps={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<Button colorScheme="primary" leftIcon={<GithubIcon />}>
					Integrate with Github
				</Button>
			</MainLayout>
		</>
	);
}

export const getServerSideProps = async ({ locale }) => {
	// Some issue with Vercel and Next.js i18n. This is a workaround.
	existsSync(path.resolve(process.cwd(), `${'./public/locales'}/${locale}`));

	return {
		props: {
			...(await serverSideTranslations(String(locale), ['common'])),
		},
	};
};
