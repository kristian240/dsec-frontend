import { RepoFields } from '@/components/new-repository/CreateRepositoryFormLayout/utils';
import {
	Box,
	Container,
	HStack,
	Radio,
	RadioGroup,
	Stack,
	StackProps,
	Text,
	useRadio,
	useRadioGroup,
	UseRadioProps,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { Controller } from 'react-hook-form';

function RadioCard(props: UseRadioProps & { children: ReactNode }) {
	const { getInputProps, getCheckboxProps } = useRadio(props);

	const input = getInputProps();
	const checkbox = getCheckboxProps();

	return (
		<Box as="label">
			<input {...input} />
			<Box
				{...checkbox}
				cursor="pointer"
				borderRadius="15px"
				backgroundColor="#F5F5F5"
				_checked={{
					bg: '#4C4C4C',
					color: 'white',
					borderColor: '#4C4C4C',
				}}
				px={6}
				py={1}
			>
				{props.children}
			</Box>
		</Box>
	);
}

function Selection({ options, ...useRadioProps }) {
	const { getRootProps, getRadioProps } = useRadioGroup(useRadioProps);
	const group = getRootProps();

	return (
		<HStack {...group} backgroundColor="#F5F5F5" borderRadius={10} p={2} justifyContent="space-around">
			{options.map((value: string) => {
				const radio = getRadioProps({ value });
				return (
					<RadioCard key={value} {...radio}>
						{value}
					</RadioCard>
				);
			})}
		</HStack>
	);
}

const types = ['Website', 'Executable', 'Mobile', 'Other'];
const domains = ['Finance', 'Social', 'Sport', 'E-commerce'];
const languages = ['C/C++', 'Python', 'Go', 'PHP', 'Other'];

export const RepositoryDetails: FC<StackProps> = (props) => {
	return (
		<Container as={Stack} spacing={5} {...props}>
			<Text align="center">
				Select the <b>type</b> of your repository:
			</Text>
			<Controller
				name={RepoFields.TYPE}
				rules={{ required: true }}
				render={({ field }) => <Selection options={types} {...field} ref={null} />}
			/>
			<Text align="center">
				Select the <b>domain</b> of your repository:
			</Text>
			<Controller
				name={RepoFields.DOMAIN}
				rules={{ required: true }}
				render={({ field }) => <Selection options={domains} {...field} ref={null} />}
			/>
			<Text align="center">
				Select the <b>language</b> of your repository:
			</Text>
			<Controller
				name={RepoFields.LANGUAGE}
				rules={{ required: true }}
				render={({ field }) => <Selection options={languages} {...field} ref={null} />}
			/>
			<Controller
				name={RepoFields.USER_DATA}
				rules={{ required: true }}
				render={({ field }) => (
					<RadioGroup {...field} ref={null}>
						<Text as="b">Do you store any user data?</Text>
						<Stack>
							<Radio value="2">Yes, we store personal data such as emails.</Radio>
							<Radio value="1">Yes, but meta data only.</Radio>
							<Radio value="0">No</Radio>
						</Stack>
					</RadioGroup>
				)}
			/>
		</Container>
	);
};
