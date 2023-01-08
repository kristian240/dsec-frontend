import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import Topic, { Topics } from '../Topic';

interface ReadMoreProps {
	activeTopic?: Topics;
}

const ReadMore: React.FC<ReadMoreProps> = ({ activeTopic }) => {
	const topics = [Topics.Requirements, Topics.Design, Topics.Deployment, Topics.Testing, Topics.Deployment];

	return (
		<>
			<Heading as="h3" fontSize="24px">
				Read more
			</Heading>
			<Flex wrap="wrap" gap="2rem" justifyContent="center" mt="3rem">
				{activeTopic ? <Topic variant={activeTopic} /> : null}
				<Topic variant={Topics.Design} />
				<Topic variant={Topics.Development} />
				<Topic variant={Topics.Testing} />
				<Topic variant={Topics.Deployment} />
			</Flex>
		</>
	);
};

export default ReadMore;
