import {
	Container,
	Heading,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Stack,
	StackProps,
} from '@chakra-ui/react';
import { FC } from 'react';

interface IPrioritizationProps {}

export const Prioritization: FC<StackProps> = (props) => {
	return (
		<Container as={Stack} spacing={8} {...props}>
			<p>
				In this step we ask you to prioritize what security aspects are important for your project. All aspects are of
				course important, but we will use this to show you the most important information first.
			</p>
			<Heading as="h4" size="md">
				Data security
			</Heading>
			<Slider colorScheme="blackAlpha" defaultValue={30}>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<SliderThumb />
			</Slider>
			<Heading as="h4" size="md">
				Service availability
			</Heading>
			<Slider colorScheme="blackAlpha" defaultValue={30}>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<SliderThumb />
			</Slider>
			<Heading as="h4" size="md">
				Some other aspects
			</Heading>
			<Slider colorScheme="blackAlpha" defaultValue={30}>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<SliderThumb />
			</Slider>
		</Container>
	);
};
