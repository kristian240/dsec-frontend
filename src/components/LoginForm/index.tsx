import { Button, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { post } from '../../utils/network';

export default function LoginForm() {
	const { handleSubmit } = useForm();

	function onLoginAction(formData) {
		const requestBody = {
			data: {
				email: formData['login-email'],
				password: formData['login-password'],
			},
		};
		post('/auth/login', requestBody)
			.then((res) => {
				console.log(res);
			})
			.catch((res) => {
				if (res.errors && res.errors[0] && res.errors[0].message) {
					console.log(res.errors[0].message);
				}
			});
	}

	return (
		<form onSubmit={handleSubmit(onLoginAction)}>
			<VStack align="stretch">
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
