import { post } from '@/utils/network';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
	Box,
	BoxProps,
	Button,
	Center,
	Flex,
	Heading,
	Link,
	Spinner,
	Tag,
	TagLabel,
	TagRightIcon,
	Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { FC, useMemo } from 'react';
import useSWR from 'swr';
import useMutation from 'use-mutation';

interface IRepoDetailsSectionProps extends BoxProps {
	repoId: string;
}

export const RepoDetailsSection: FC<IRepoDetailsSectionProps> = ({ repoId, ...rest }) => {
	const { data, error } = useSWR(repoId ? `/api/repo/${repoId}` : null);
	// const repoJobs = useMemo(() => data?.filter((job) => String(job.repo.id) === repoId), [data, repoId]);

	const [startAnalysis] = useMutation(() => post(`/api/repo/trigger/${repoId}`));

	if (error?.status === 404) {
		return (
			<Flex direction="column" align="center" gap={4} {...rest}>
				<Text fontSize="xl">
					Error occurred.{' '}
					<Link as={NextLink} href="/dashboard">
						Go to dashboard.
					</Link>
				</Text>
			</Flex>
		);
	}

	if (!data) {
		return (
			<Center {...rest}>
				<Spinner />
			</Center>
		);
	}

	return (
		<Box {...rest}>
			<Heading>{data.repoName}</Heading>

			<Flex mt={8} gap={2}>
				<Tag colorScheme="cyan">Type: {data.type}</Tag>
				<Tag colorScheme="green">Domain: {data.domain}</Tag>
				<Tag colorScheme="blue">User data: {data.userData ? '☑️' : '❌'}</Tag>
				<Tag colorScheme="pink">Availability: {data.availability} / 6</Tag>
				<Tag colorScheme="red">Security: {data.security} / 6</Tag>
				<Tag colorScheme="gray">
					<TagLabel>
						<Link href={data.htmlUrl} isExternal>
							GitHub Repo
						</Link>
					</TagLabel>
					<TagRightIcon as={ExternalLinkIcon} />
				</Tag>
			</Flex>

			<Text fontSize="lg" fontWeight="semibold" mt={4}>
				Repo description
			</Text>
			<Text fontSize="lg" whiteSpace="pre-line">
				{data.description}
			</Text>
		</Box>
	);
};
