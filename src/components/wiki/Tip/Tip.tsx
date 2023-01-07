import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { CSSProperties } from '@emotion/serialize';
import React, { useMemo } from 'react';

interface TipProps {
	align: 'left' | 'right';
	title: string;
	description: string;
	index: number;
	accentColor: string;
}

const Tip: React.FC<TipProps> = ({ align, title, description, index, accentColor }) => {
	return (
		<Container maxW="100%" bgColor={align === 'left' ? 'white' : accentColor} px="calc((100% - 800px) / 2)">
			<Flex sx={styles[align]} alignItems="center" py="100" justifyContent="space-between">
				<Heading as="span" w="40%" textAlign="center" className="albra" fontSize="5rem">
					#{index + 1}
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

const styles: { left: CSSProperties; right: CSSProperties } = {
	left: {
		flexDirection: 'row',
		color: '#161616',
	},
	right: {
		flexDirection: 'row-reverse',
		color: 'white',
	},
};

export default Tip;
