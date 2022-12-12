import {
	Center,
	Container,
	FormControl,
	FormLabel,
	Select,
	Spinner,
	Stack,
	StackProps,
	Textarea,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import useSWR from 'swr';
import { RepoFields, RepoFormValues } from '../CreateRepositoryFormLayout/utils';

export const NewRepository: FC<StackProps> = (props) => {
	const { register } = useFormContext<RepoFormValues>();
	const router = useRouter();
	const { data: repos } = useSWR('/api/github/user/repos', {
		onError: (error) => {
			if (error.code === '403') {
				router.push('/repos/github');
			}
		},
	});
	if (!repos) {
		return (
			<Center>
				<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
			</Center>
		);
	}

	return (
		<>
			<Container as={Stack} spacing={8} {...props}>
				<FormControl>
					<FormLabel>Select repository</FormLabel>
					<Select {...register(RepoFields.REPO)}>
						{repos.map((repo) => (
							<option key={repo.id} value={repo.name}>
								{repo.fullName}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl>
					<FormLabel>Description</FormLabel>
					<Textarea placeholder="Description" {...register(RepoFields.DESCRIPTION)} />
				</FormControl>
			</Container>
		</>
	);
};
