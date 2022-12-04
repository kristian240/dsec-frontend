import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import { CreateProjectFormLayout } from '@/components/new-project/CreateProjectFormLayout';
import { CreateProjectSteps } from '@/components/new-project/CreateProjectFormLayout/enums';
import { CreateProjectFormProvider } from '@/components/new-project/CreateProjectFormProvider';
import { ProjectDetails } from '@/components/new-project/ProjectDetails';
import { NewRepository } from '@/components/new-project/NewRepository';
import { Prioritization } from '@/components/new-project/Prioritization';
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
							[CreateProjectSteps.NewRepository]: <NewRepository mt={12} />,
							[CreateProjectSteps.ProjectDetails]: <ProjectDetails mt={12} />,
							[CreateProjectSteps.Priorities]: <Prioritization mt={12} />,
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
