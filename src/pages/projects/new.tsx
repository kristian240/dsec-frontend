import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { CreateProjectFormLayout } from '@/components/new-project/CreateProjectFormLayout';
import { CreateProjectSteps } from '@/components/new-project/CreateProjectFormLayout/enums';
import { CreateProjectFormProvider } from '@/components/new-project/CreateProjectFormProvider';
import { NewProjectStep } from '@/components/new-project/NewProjectStep';
import { Container } from '@chakra-ui/react';
import { existsSync } from 'fs';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import path from 'path';

export default function NewProjectPage() {
	return (
		<MainLayout navigation={<MainNavigation />}>
			<Container pt={12} maxW="container.xl">
				<CreateProjectFormProvider>
					<CreateProjectFormLayout
						minH="640px"
						steps={{
							[CreateProjectSteps.ProjectDetails]: <NewProjectStep mt={12} />,
						}}
					/>
				</CreateProjectFormProvider>
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
