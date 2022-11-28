import { Container, FormControl, FormLabel, Input, Stack, StackProps, Textarea } from '@chakra-ui/react';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface INewProjectStepProps {}

export const NewProjectStep: FC<StackProps> = (props) => {
	const { register } = useFormContext();

	return (
		<Container as={Stack} spacing={8} {...props}>
			<FormControl>
				<FormLabel>Project name</FormLabel>
				<Input placeholder="Project name" {...register('a')} />
			</FormControl>

			<FormControl>
				<FormLabel>Description</FormLabel>
				<Textarea placeholder="Description" {...register('d')} />
			</FormControl>
		</Container>
	);
};
