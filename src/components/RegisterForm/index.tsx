import { RegisterFields, RegisterFormValues, registerUser } from '@/components/RegisterForm/utils';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Text, useToast, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useMutation from 'use-mutation';

export default function RegisterForm() {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<RegisterFormValues>({
		criteriaMode: 'all',
		mode: 'onBlur',
	});

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
			if ('fieldErrors' in error) {
				(error.fieldErrors as Array<{ fieldValue: string; message: string }>).forEach((fieldError) => {
					setError(`register-${fieldError.fieldValue}` as RegisterFields, { message: fieldError.message });
				});
			} else {
				toast({ title: 'Ops! Something went wrong', status: 'error', description: error?.message });
			}
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<VStack align="stretch">
				<FormControl isInvalid={Boolean(errors[RegisterFields.EMAIL])}>
					<FormLabel>Email</FormLabel>
					<Input
						type="email"
						placeholder="Email"
						{...register(RegisterFields.EMAIL, {
							required: 'Email is required.',
							pattern: {
								value: /.*@.*/,
								message: 'Email is not valid.',
							},
						})}
					/>
					<FormErrorMessage>{errors[RegisterFields.EMAIL]?.message}</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={Boolean(errors[RegisterFields.FIRST_NAME])}>
					<FormLabel>First name</FormLabel>
					<Input
						placeholder="First name"
						{...register(RegisterFields.FIRST_NAME, {
							required: 'First name is required.',
							pattern: {
								value: /[\p{Letter}\p{Mark}]+/gu,
								message: 'First name must contain only letters.',
							},
							maxLength: {
								value: 32,
								message: 'First name should be only 32 characters long.',
							},
						})}
					/>
					<FormErrorMessage>{errors[RegisterFields.FIRST_NAME]?.message}</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={Boolean(errors[RegisterFields.LAST_NAME])}>
					<FormLabel>Last name</FormLabel>
					<Input
						placeholder="Last name"
						{...register(RegisterFields.LAST_NAME, {
							required: 'Last name is required.',
							pattern: {
								value: /[\p{Letter}\p{Mark}]+/gu,
								message: 'Last name must contain only letters.',
							},
							maxLength: {
								value: 32,
								message: 'Last name should be only 32 characters long.',
							},
						})}
					/>
					<FormErrorMessage>{errors[RegisterFields.LAST_NAME]?.message}</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={Boolean(errors[RegisterFields.PASSWORD])}>
					<FormLabel>Password</FormLabel>
					<Input
						type="password"
						placeholder="Password"
						{...register(RegisterFields.PASSWORD, {
							required: 'Password is required.',
							pattern: {
								value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{10,}$/,
								message:
									'Password is too simple. Length must be 10 or more characters. Use uppercase, digit and special characters.',
							},
						})}
					/>
					<FormErrorMessage>{errors[RegisterFields.PASSWORD]?.message}</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={Boolean(errors[RegisterFields.PASSWORD_REPEAT])}>
					<FormLabel>Repeat password</FormLabel>
					<Input
						type="password"
						placeholder="Repeat password"
						{...register(RegisterFields.PASSWORD_REPEAT, {
							required: 'You have to repeat your password.',
							pattern: {
								value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{10,}$/,
								message:
									'Password is too simple. Length must be 10 or more characters. Use uppercase, digit and special characters.',
							},
						})}
					/>
					<FormErrorMessage>{errors[RegisterFields.PASSWORD_REPEAT]?.message}</FormErrorMessage>
				</FormControl>

				<Button type="submit" colorScheme="blue" isLoading={isSubmitting} isDisabled={isSubmitting}>
					Sign up
				</Button>

				<Text textAlign="center">
					By creating an account, you are accepting our terms of service and privacy and cookie policy.
				</Text>
			</VStack>
		</form>
	);
}
