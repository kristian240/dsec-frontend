import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import Topic, { Topics } from '@/components/wiki/Topic';
import { Container, Flex, Heading } from '@chakra-ui/react';
import { InferGetStaticPropsType, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type WikiPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Wiki: NextPage<WikiPageProps> = () => {
	return (
		<MainLayout navigation={<MainNavigation />}>
			<Container maxW="container.xl" mt={16}>
				<Heading as="h2" textAlign="center">
					Wiki
				</Heading>

				<Flex wrap="wrap" gap="2rem" justifyContent="center" mt="3rem">
					<Topic variant={Topics.Requirements} />
					<Topic variant={Topics.Design} />
					<Topic variant={Topics.Development} />
					<Topic variant={Topics.Testing} />
					<Topic variant={Topics.Deployment} />
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

export default Wiki;
