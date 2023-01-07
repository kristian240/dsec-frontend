import { Box, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import Topic, { Topics } from '../Topic';

interface ReadMoreProps {
	activeTopic: Topics;
}

const ReadMore: React.FC<ReadMoreProps> = ({ activeTopic }) => {
	const topics = [Topics.Requirements, Topics.Design, Topics.Development, Topics.Testing, Topics.Deployment];

	return (
		<Box maxW="800" mx="auto" my="100px">
			<Heading as="h3" fontSize="24px">
				Read more
			</Heading>
			<Flex wrap="wrap" gap="2rem" justifyContent="center" mt="3rem">
				{topics
					.filter((topic) => topic !== activeTopic)
					.map((variant) => (
						<Topic variant={variant} key={variant} />
					))}
			</Flex>
		</Box>
	);
};

export default ReadMore;
