import HomeSection from '@/components/HomeSection';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { Container, Heading, Text, VStack } from '@chakra-ui/react';
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
			<Container maxW="992px" px="0">
				<VStack spacing={8} mb="100px">
					<Heading as="h1" textAlign="center" fontSize="6rem" className="albra" lineHeight={1}>
						{t('home.title')}
					</Heading>
					<Heading as="h2" textAlign="center" w="80%" mx="auto" fontSize="3rem" className="albra">
						A Data Analyzer tool for ensuring secure software development life-cycle
					</Heading>
					<Text textAlign="center" w="100%" maxW="491px">
						A tool to help developers to find security hotspots and inconsistencies in different SDLC artifacts. Simple
						and intuitive, that’s what DSEC offers.
					</Text>
				</VStack>

				<VStack spacing="6rem">
					<HomeSection variant={'flawDetection'} />
					<HomeSection variant={'gdpr'} />
					<HomeSection variant={'collaboration'} />
				</VStack>
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
