import {
	Container,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Stack,
	StackProps,
	Text,
} from '@chakra-ui/react';
import { FC } from 'react';

interface IPrioritizationProps {}

export const Prioritization: FC<StackProps> = (props) => {
	return (
		<Container as={Stack} spacing={8} {...props}>
			<Text>
				In this step we ask you to prioritize what security aspects are important for your project. All aspects are of
				course important, but we will use this to show you the most important information first.
			</Text>
			<Text as="b">Data security</Text>
			<Slider colorScheme="blackAlpha" defaultValue={3} max={10}>
				<SliderTrack boxSize={2.5} borderRadius={10} backgroundColor="#F5F5F5">
					<SliderFilledTrack backgroundColor="black" />
				</SliderTrack>
				<SliderThumb backgroundColor="black" />
			</Slider>
			<Text as="b">Service availability</Text>
			<Slider colorScheme="blackAlpha" defaultValue={3} max={10}>
				<SliderTrack boxSize={2.5} borderRadius={10} backgroundColor="#F5F5F5">
					<SliderFilledTrack backgroundColor="black" />
				</SliderTrack>
				<SliderThumb backgroundColor="black" />
			</Slider>
			<Text as="b">Some other aspects</Text>
			<Slider colorScheme="blackAlpha" defaultValue={3} max={10}>
				<SliderTrack boxSize={2.5} borderRadius={10} backgroundColor="#F5F5F5">
					<SliderFilledTrack backgroundColor="black" />
				</SliderTrack>
				<SliderThumb backgroundColor="black" />
			</Slider>
		</Container>
	);
};
