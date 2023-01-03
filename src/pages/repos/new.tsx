import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { CreateRepositoryFormLayout } from '@/components/new-repository/CreateRepositoryFormLayout';
import { CreateRepositorySteps } from '@/components/new-repository/CreateRepositoryFormLayout/enums';
import { CreateRepositoryFormProvider } from '@/components/new-repository/CreateRepositoryFormProvider';
import { NewRepository } from '@/components/new-repository/NewRepository';
import { Prioritization } from '@/components/new-repository/Prioritization';
import { RepositoryDetails } from '@/components/new-repository/RepositoryDetails';
import { Container } from '@chakra-ui/react';
import { existsSync } from 'fs';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import path from 'path';

export default function NewRepositoryPage() {
	return (
		<MainLayout navigation={<MainNavigation />}>
			<Container pt={12} maxW="container.xl">
				<CreateRepositoryFormProvider>
					<CreateRepositoryFormLayout
						minH="640px"
						steps={{
							[CreateRepositorySteps.NewRepository]: <NewRepository mt={12} />,
							[CreateRepositorySteps.RepositoryDetails]: <RepositoryDetails mt={12} />,
							[CreateRepositorySteps.Priorities]: <Prioritization mt={12} />,
						}}
					/>
				</CreateRepositoryFormProvider>
			</Container>
		</MainLayout>
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
