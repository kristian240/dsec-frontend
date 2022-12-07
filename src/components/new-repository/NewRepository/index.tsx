import { Container, FormControl, FormLabel, Input, Select, Stack, StackProps, Textarea } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import useSWR from 'swr';

interface INewRepositoryProps {}

export const NewRepository: FC<StackProps> = (props) => {
	const { register } = useFormContext();
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
		<Container as={Stack} spacing={8} {...props}>
			<FormControl>
				<FormLabel>Select repository</FormLabel>
				<Select>
					{repos.map((repo) => (
						<option key={repo.id}>{repo.full_name}</option>
					))}
				</Select>
			</FormControl>
			<FormControl>
				<FormLabel>Name</FormLabel>
				<Input placeholder="Name" {...register('a')} />
			</FormControl>
			<FormControl>
				<FormLabel>Description</FormLabel>
				<Textarea placeholder="Description" {...register('d')} />
			</FormControl>
		</Container>
	);
};
