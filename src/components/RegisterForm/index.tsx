import { Button, FormErrorMessage, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export default function RegisterForm() {
	const { handleSubmit } = useForm();

	function onRegisterAction(formData) {
		const requestBody = {
			data: {
				email: formData['register-email'],
				firstName: formData['register-firstname'],
				lastName: formData['register-lastname'],
				password: formData['register-password'],
			},
		};
	}
	return (
		<form onSubmit={handleSubmit(onRegisterAction)}>
			<VStack align="stretch">
				<FormLabel>Email</FormLabel>
				<Input type="email" placeholder="Email" name="register-email" />
				<FormErrorMessage>Email is required.</FormErrorMessage>
				<FormLabel>First name</FormLabel>
				<Input placeholder="First name" name="register-firstname" />
				<FormErrorMessage>First name is required.</FormErrorMessage>
				<FormLabel>Last name</FormLabel>
				<Input placeholder="Last name" name="register-lastname" />
				<FormLabel>Password</FormLabel>
				<Input type="password" placeholder="Password" name="register-password" />
				<FormErrorMessage>Password is required.</FormErrorMessage>
				<Button type="submit" colorScheme="blue">
					Sign up
				</Button>
				<Text textAlign="center">
					By creating an account, you are accepting our terms of service and privacy and cookie policy.
				</Text>
			</VStack>
		</form>
	);
}
