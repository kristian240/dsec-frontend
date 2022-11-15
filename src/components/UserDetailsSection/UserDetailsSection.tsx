import { UserDetailsForm } from '@/components/UserDetails';
import { useUser } from '@/hooks/useUser';
import { Center, Spinner, SystemProps, useCounter, useToast } from '@chakra-ui/react';
import { FC } from 'react';

export const UserDetailsSection: FC<SystemProps> = (props) => {
	const { data: user, mutate: mutateUser } = useUser();
	const { increment, value } = useCounter();
	const toast = useToast();

	if (!user) {
		return (
			<Center {...props}>
				<Spinner />
			</Center>
		);
	}

	return (
		<UserDetailsForm
			key={value}
			onSuccess={({ data }) => {
				mutateUser(data, true);
				increment();
				toast({ title: 'User details updated', status: 'success' });
			}}
			user={user}
			{...props}
		/>
	);
};
