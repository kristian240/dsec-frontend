import { Box, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import Topic, { Topics } from '../Topic';

interface ReadMoreProps {
	activeTopic?: Topics;
}

const ReadMore: React.FC<ReadMoreProps> = ({ activeTopic }) => {
	const topics = [Topics.Requirements, Topics.Design, Topics.Deployment, Topics.Testing, Topics.Deployment];

	return (
		<Box maxW="800" mx="auto" mt="100px">
			<Heading as="h3" fontSize="24px">
				Read more
			</Heading>
			<Flex wrap="wrap" gap="2rem" justifyContent="center" mt="3rem">
				{topics.map((variant) => (activeTopic ? <Topic variant={variant} key={variant} /> : <></>))}
				<Topic variant={Topics.Design} />
				<Topic variant={Topics.Development} />
				<Topic variant={Topics.Testing} />
				<Topic variant={Topics.Deployment} />
			</Flex>
		</Box>
	);
};

export default ReadMore;
