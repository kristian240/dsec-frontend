import {
	Box,
	Container,
	HStack,
	Slider,
	SliderFilledTrack,
	SliderTrack,
	Stack,
	StackProps,
	useRadio,
	useRadioGroup,
	Text,
	UseRadioProps,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface INewAnalysisProps {}

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
				px={3}
				py={1}
			>
				{props.children}
			</Box>
		</Box>
	);
}

function Selection(props) {
	const options = Object.values(props);
	const { getRootProps, getRadioProps } = useRadioGroup();

	const group = getRootProps();

	return (
		<HStack {...group} backgroundColor="#F5F5F5" borderRadius={10} p={2} justifyContent="space-around">
			{options.map((value: any) => {
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

export const NewAnalysis: FC<StackProps> = (props) => {
	const types = ['Website', 'Executable', 'Mobile', 'Other'];
	const priorities = ['Finance', 'Social', 'Sport', 'E-commerce'];

	return (
		<Container as={Stack} spacing={5} {...props}>
			<Text>Select the type of project you want to analyze.</Text>
			<Selection {...types}></Selection>
			<Text>Select the domain of your project.</Text>
			<Selection {...priorities}></Selection>
			<Text>Express your priorities related to the following aspects.</Text>
			<HStack>
				<Text>Security</Text>
				<Slider defaultValue={3} max={10}>
					<SliderTrack boxSize={3} borderRadius={10} backgroundColor="#F5F5F5">
						<SliderFilledTrack borderRadius={10} backgroundColor="#4C4C4C" />
					</SliderTrack>
				</Slider>
			</HStack>
			<HStack>
				<Text>Privacy </Text>
				<Slider defaultValue={3} max={10}>
					<SliderTrack boxSize={3} borderRadius={10} backgroundColor="#F5F5F5">
						<SliderFilledTrack borderRadius={10} backgroundColor="#4C4C4C" />
					</SliderTrack>
				</Slider>
			</HStack>
		</Container>
	);
};
