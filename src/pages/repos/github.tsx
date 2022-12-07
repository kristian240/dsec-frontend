import { AuthRedirect } from '@/components/AuthRedirect/AuthRedirect';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { GithubIcon } from '@/icon/GithubIcon';
import { BASE_URL } from '@/utils/network';
import { Button, Text } from '@chakra-ui/react';
import { existsSync } from 'fs';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import path from 'path';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const githubLink = [
	process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/api-proxy',
	'/api/oauth2/authorization/github?redirect_uri=',
	typeof window !== 'undefined' ? window.location.origin : null,
	process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL,
].join('');

export default function GithubPage() {
	const [isClient, setIsClient] = useState(false);
	const { data: token } = useSWR(
		'/api/users/token',
		(url) => fetch(`${BASE_URL}${url}`, { credentials: 'include' }).then((res) => res.text()),
		{ refreshInterval: 100000 }
	);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return (
			<MainLayout
				navigation={<MainNavigation />}
				containerProps={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<Button colorScheme="primary" leftIcon={<GithubIcon />}>
					Integrate with Github
				</Button>
			</MainLayout>
		);
	}

	if (!token) {
		<MainLayout
			navigation={<MainNavigation />}
			containerProps={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
		>
			<Text>Something is wrong! Please logout and login.</Text>
		</MainLayout>;
	}

	return (
		<>
			<AuthRedirect to="/login" />

			<MainLayout
				navigation={<MainNavigation />}
				containerProps={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<Button as="a" colorScheme="primary" leftIcon={<GithubIcon />} href={`${githubLink}&id_token=${token}`}>
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
