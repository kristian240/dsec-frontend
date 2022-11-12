import { Button, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
	const { handleSubmit } = useForm();

	function onLoginAction(formData) {
		const requestBody = {
			data: {
				email: formData['login-email'],
				password: formData['login-password'],
			},
		};
	}
	return (
		<form onSubmit={handleSubmit(onLoginAction)}>
			<VStack align="strech">
				<FormLabel>Email</FormLabel>
				<Input type="email" placeholder="Email" name="login-email" />
				<FormLabel>Password</FormLabel>
				<Input type="password" placeholder="Password" name="login-password" />
				<Button type="submit" colorScheme="blue">
					Login
				</Button>
				<Text textAlign="center">Have you forgot you password?</Text>
			</VStack>
		</form>
	);
}
