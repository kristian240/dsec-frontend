import {
	Alert,
	AlertIcon,
	Button,
	Container,
	FormControl,
	FormLabel,
	Select,
	Stack,
	StackProps,
	Text,
} from '@chakra-ui/react';
import { FC } from 'react';

const options = [
	{ value: 'team1', label: 'Team 1' },
	{ value: 'team2', label: 'Team 2' },
	{ value: 'team3', label: 'Team 3' },
];

export const AddTeam: FC<StackProps> = (props) => {
	return (
		<Container as={Stack} spacing={8} {...props}>
			<Text align="center">
				By adding a team to your repository, your colleagues will also be able to view the results of analysis.
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
			<Alert status="warning">
				<AlertIcon />
				<Text>
					This feature is currently unavailable. Please, click on <b>Finish</b> to create your repository.
				</Text>
			</Alert>
		</Container>
	);
};
