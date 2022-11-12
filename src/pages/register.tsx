import AuthHeader from '@/components/AuthHeader';
import RegisterForm from '@/components/RegisterForm';
import { Box } from '@chakra-ui/react';

export default function RegisterPage() {
	return (
		<Box mx="auto" my="100px" maxW="500px">
			<AuthHeader />
			<RegisterForm />
		</Box>
	);
}
