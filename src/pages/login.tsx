import AuthHeader from '@/components/AuthHeader';
import LoginForm from '@/components/LoginForm';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import { Box } from '@chakra-ui/react';

export default function LoginPage() {
	return (
		<MainLayout>
			<Box mx="auto" my="70px" maxW="500px">
				<AuthHeader mb={4} />
				<LoginForm />
			</Box>
		</MainLayout>
	);
}
