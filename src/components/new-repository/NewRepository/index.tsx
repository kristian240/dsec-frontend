import { Container, FormControl, FormLabel, Input, Select, Stack, StackProps, Textarea } from '@chakra-ui/react';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface INewRepositoryProps {}

export const NewRepository: FC<StackProps> = (props) => {
	const { register } = useFormContext();
	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	];

	return (
		<Container as={Stack} spacing={8} {...props}>
			<FormControl>
				<FormLabel>Select repository</FormLabel>
				<Select>
					{options.map((option) => (
						<option key={option.value}>{option.label}</option>
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
