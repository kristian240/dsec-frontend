import AuthHeader from '@/components/AuthHeader';
import LoginForm from '@/components/LoginForm';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import { Box } from '@chakra-ui/react';

export default function LoginPage() {
	return (
		<MainLayout>
			<Box mx="auto" my="100px" maxW="500px">
				<AuthHeader />
				<LoginForm />
			</Box>
		</MainLayout>
	);
}
