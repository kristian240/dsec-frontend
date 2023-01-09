import { HelpProps, Step } from '@/components/Help/utils';
import { Box, Divider, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';

export const Help = (props: HelpProps) => {
	return (
		<>
			<Divider size="lg" colorScheme="green" p={4}></Divider>
			<HStack justifyContent="space-between">
				<VStack w="50%">
					<Heading as="h2" className="albra" mb=".3em">
						{props.title}
					</Heading>
					<Image src={props.img.src} alt=""></Image>
				</VStack>
				<Box w="40%">
					{props.steps.map((step: Step) => {
						return (
							<>
								<Heading as="h6" size="md" className="albra" mb=".3em" m={0}>
									{step.title}
								</Heading>
								<Text pb={3}>{step.text}</Text>
								<Box>
									{'substeps' in step
										? step.substeps.map((substep: Step) => {
												return (
													<Box key={substep.title} pl={10}>
														<Heading as="h6" size="sm" className="albra" mb=".3em" m={0}>
															{substep.title}
														</Heading>
														<Text pb={2}>{substep.text}</Text>
													</Box>
												);
										  })
										: null}
								</Box>
							</>
						);
					})}
				</Box>
			</HStack>
		</>
	);
};
