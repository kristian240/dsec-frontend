import { Button, FormControl, FormLabel, Input, Text, useToast, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useMutation from 'use-mutation';
import { LoginFields, LoginFormValues, loginUser } from './utils';

export default function LoginForm() {
	const { handleSubmit, register } = useForm<LoginFormValues>();
	const toast = useToast();
	const router = useRouter();

	const [onSubmit] = useMutation(loginUser, {
		onSuccess: () => {
			router.push('/');
		},
		onFailure: ({ error }) => {
			toast({ title: 'Ops! Something went wrong', status: 'error', description: error?.message });
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<VStack align="stretch">
				<FormControl isRequired>
					<FormLabel>Email</FormLabel>
					<Input type="email" placeholder="Email" {...register(LoginFields.EMAIL)} />
				</FormControl>

				<FormControl isRequired>
					<FormLabel>Password</FormLabel>
					<Input type="password" placeholder="Password" {...register(LoginFields.PASSWORD)} />
				</FormControl>

				<Button type="submit" colorScheme="blue">
					Login
				</Button>
			</VStack>
		</form>
	);
}
