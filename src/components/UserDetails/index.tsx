import { updateUserData, UserDetailsFormFields, UserDetailsFormValues } from '@/components/UserDetails/utils';
import { IUserDto } from '@/interfaces/api/IUserDto';
import { Button, FormControl, FormLabel, Input, StackProps, useToast, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import useMutation from 'use-mutation';

interface IUserDetailsForm extends StackProps {
	user: IUserDto;
	onSuccess?(payload: { data: IUserDto }): void;
}

export const UserDetailsForm: FC<IUserDetailsForm> = ({ user, onSuccess, ...rest }) => {
	const { handleSubmit, register, formState } = useForm<UserDetailsFormValues>({
		defaultValues: {
			[UserDetailsFormFields.EMAIL]: user.username || user.email, // backend returns username or email (depending on the request URL)
			[UserDetailsFormFields.FIRST_NAME]: user.firstName,
			[UserDetailsFormFields.LAST_NAME]: user.lastName,
		},
	});

	const toast = useToast();

	const [handleSave] = useMutation((formData) => updateUserData(user.id, formData), {
		onSuccess,
		onFailure: ({ error }) => {
			toast({ title: 'Ops! Something went wrong', status: 'error', description: error?.message });
		},
	});

	return (
		<VStack as="form" onSubmit={handleSubmit(handleSave)} align="stretch" spacing={6} {...rest}>
			<FormControl>
				<FormLabel>Email</FormLabel>
				<Input type="email" placeholder="Email" {...register(UserDetailsFormFields.EMAIL)} />
			</FormControl>

			<FormControl>
				<FormLabel>First name</FormLabel>
				<Input placeholder="First name" {...register(UserDetailsFormFields.FIRST_NAME)} />
			</FormControl>

			<FormControl>
				<FormLabel>Last name</FormLabel>
				<Input placeholder="Last name" {...register(UserDetailsFormFields.LAST_NAME)} />
			</FormControl>

			{formState.isDirty ? (
				<Button type="submit" colorScheme="blue" mt={4} isLoading={formState.isSubmitting}>
					Save changes
				</Button>
			) : null}
		</VStack>
	);
};
