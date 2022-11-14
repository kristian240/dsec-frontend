import { RegisterFields, RegisterFormValues, registerUser } from '@/components/RegisterForm/utils';
import { Button, FormControl, FormLabel, Input, Text, useToast, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useMutation from 'use-mutation';

export default function RegisterForm() {
	const { handleSubmit, register } = useForm<RegisterFormValues>();
	const toast = useToast();
	const router = useRouter();

	const [onSubmit] = useMutation(registerUser, {
		onSuccess: () => {
			toast({
				title: 'Successful registration',
				status: 'success',
				description: 'You have successfully registered your account',
			});
			router.push('/login');
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
					<Input type="email" placeholder="Email" {...register(RegisterFields.EMAIL)} />
				</FormControl>

				<FormControl isRequired>
					<FormLabel>First name</FormLabel>
					<Input placeholder="First name" {...register(RegisterFields.FIRST_NAME)} />
				</FormControl>

				<FormControl isRequired>
					<FormLabel>Last name</FormLabel>
					<Input placeholder="Last name" {...register(RegisterFields.LAST_NAME)} />
				</FormControl>

				<FormControl isRequired>
					<FormLabel>Password</FormLabel>
					<Input type="password" placeholder="Password" {...register(RegisterFields.PASSWORD)} />
				</FormControl>

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
