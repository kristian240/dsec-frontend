import AuthHeader from '@/components/AuthHeader';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import RegisterForm from '@/components/RegisterForm';
import { Box } from '@chakra-ui/react';

export default function RegisterPage() {
	return (
		<MainLayout>
			<Box mx="auto" my="70px" maxW="500px">
				<AuthHeader />
				<RegisterForm />
			</Box>
		</MainLayout>
	);
}
