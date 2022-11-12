import AuthHeader from '@/components/AuthHeader';
import LoginForm from '@/components/LoginForm';
import { Box } from '@chakra-ui/react';

export default function LoginPage() {
	return (
		<Box mx="auto" my="100px" maxW="500px">
			<AuthHeader />
			<LoginForm />
		</Box>
	);
}
