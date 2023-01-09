import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

interface TipProps {
	align: 'left' | 'right';
	title: string;
	description: string;
	index: number;
	accentColor?: string;
}

const Tip: React.FC<TipProps> = ({ align, title, description, index, accentColor }) => {
	const bgColor = accentColor || 'fff';
	const color = accentColor ? '#fff' : '#161616';
	const flexDirection = align === 'left' ? 'row' : 'row-reverse';

	return (
		<Container maxW="100%" bgColor={bgColor} px="calc((100% - 800px) / 2)">
			<Flex sx={{ color, flexDirection }} alignItems="center" py="100" justifyContent="space-between">
				<Heading as="span" w="40%" textAlign="center" className="albra" fontSize="5rem">
					#{index}
				</Heading>
				<Box w="60%">
					<Heading as="h2" className="albra" mb=".3em">
						{title}
					</Heading>
					<Text>{description}</Text>
				</Box>
			</Flex>
		</Container>
	);
};

export default Tip;
