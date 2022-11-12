import { Button, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { post } from '../../utils/network';

export default function RegisterForm() {
	const { handleSubmit } = useForm();

	function onRegisterAction(formData) {
		const requestBody = {
			data: {
				firstName: formData['register-firstname'],
				lastName: formData['register-lastname'],
				email: formData['register-email'],
				password: formData['register-password'],
			},
		};
		post('/auth/register', requestBody)
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
