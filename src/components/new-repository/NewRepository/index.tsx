import { Container, FormControl, FormLabel, Input, Select, Stack, StackProps, Textarea } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import useSWR from 'swr';
import { RepoFields, RepoFormValues } from '../CreateRepositoryFormLayout/utils';

interface INewRepositoryProps {}

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
		return null;
	}

	return (
		<>
			<Container as={Stack} spacing={8} {...props}>
				<FormControl>
					<FormLabel>Select repository</FormLabel>
					<Select>
						{repos.map((repo) => (
							<option key={repo.id} value={repo.name} {...register(RepoFields.REPO)}>
								{repo.full_name}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl>
					<FormLabel>Name</FormLabel>
					<Input placeholder="Name" {...register(RepoFields.NAME)} />
				</FormControl>
				<FormControl>
					<FormLabel>Description</FormLabel>
					<Textarea placeholder="Description" {...register(RepoFields.DESCRIPTION)} />
				</FormControl>
			</Container>
		</>
	);
};
