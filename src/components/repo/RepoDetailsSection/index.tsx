import { ConfirmButton } from '@/components/ConfirmButton/ConfirmButton';
import { destroy } from '@/utils/network';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
	Box,
	BoxProps,
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
import { FC } from 'react';
import useSWR from 'swr';

interface IRepoDetailsSectionProps extends BoxProps {
	repoId: string;
}

export const RepoDetailsSection: FC<IRepoDetailsSectionProps> = ({ repoId, ...rest }) => {
	const { data, error } = useSWR(repoId ? `/api/repo/${repoId}` : null);

	if (error) {
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
				<Tag colorScheme="pink">Availability: {data.availability} / 5</Tag>
				<Tag colorScheme="red">Security: {data.security} / 5</Tag>
				<Tag colorScheme="gray">
					<TagLabel>
						<Link href={data.htmlUrl} isExternal>
							GitHub Repo
						</Link>
					</TagLabel>
					<TagRightIcon as={ExternalLinkIcon} />
				</Tag>
				<ConfirmButton
					headerText={`Delete ${data.repoName}`}
					bodyText="Are you sure you want to delete this repo? This cannot be undone."
					onSuccessAction={() => {
						destroy(`/api/repo/${repoId}`);
					}}
					buttonText="Delete repo"
					isDanger={true}
					redirectLink="/dashboard"
				/>
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
