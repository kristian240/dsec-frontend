import { Button, FormErrorMessage, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { post } from '../../utils/network';

enum RegisterFields {
	EMAIL = 'register-email',
	FIRST_NAME = 'register-firstname',
	LAST_NAME = 'register-lastname',
	PASSWORD = 'register-password',
}

export default function RegisterForm() {
	const { handleSubmit, register } = useForm();

	function onRegisterAction(formData: Record<RegisterFields, unknown>) {
		const requestBody = {
			firstName: formData[RegisterFields.FIRST_NAME],
			lastName: formData[RegisterFields.LAST_NAME],
			email: formData[RegisterFields.EMAIL],
			password: formData[RegisterFields.PASSWORD],
		};
		post('/api/auth/register', requestBody)
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
				<Input type="email" placeholder="Email" {...register(RegisterFields.EMAIL)} />
				<FormErrorMessage>Email is required.</FormErrorMessage>

				<FormLabel>First name</FormLabel>
				<Input placeholder="First name" {...register(RegisterFields.FIRST_NAME)} />
				<FormErrorMessage>First name is required.</FormErrorMessage>

				<FormLabel>Last name</FormLabel>
				<Input placeholder="Last name" {...register(RegisterFields.LAST_NAME)} />

				<FormLabel>Password</FormLabel>
				<Input type="password" placeholder="Password" {...register(RegisterFields.PASSWORD)} />
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
