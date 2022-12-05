import { Button, Container, FormControl, FormLabel, Select, Stack, StackProps, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface IAddTeamProps {}

export const AddTeam: FC<StackProps> = (props) => {
	const { register } = useFormContext();
	const options = [
		{ value: 'team1', label: 'Team 1' },
		{ value: 'team2', label: 'Team 2' },
		{ value: 'team3', label: 'Team 3' },
	];

	return (
		<Container as={Stack} spacing={8} {...props}>
			<Text>
				By adding a team to your repository, your colleagues will also be able to view the results of analysis
			</Text>
			<FormControl>
				<FormLabel>Select team</FormLabel>
				<Select>
					{options.map((option) => (
						<option key={option.value}>{option.label}</option>
					))}
				</Select>
			</FormControl>
			<Button>Create team</Button>
			<Text as="b" color="red" fontSize="20px">
				This feature is currently unavailable. Please, click on Finish to create your project.
			</Text>
		</Container>
	);
};
