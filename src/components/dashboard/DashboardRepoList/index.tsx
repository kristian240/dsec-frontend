import { DashboardRepoListFallback } from '@/components/dashboard/DashboardRepoList/fallback';
import { useUserRepos } from '@/hooks/useUserRepos';
import { Center, Flex, Grid, GridProps, Heading, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';

export const DashboardRepoList: FC<GridProps> = (props) => {
	const { data: repos, error } = useUserRepos();

	if (error) {
		return (
			<Grid placeItems="center" {...props}>
				<Text>Ops, something went wrong! Try again later.</Text>
			</Grid>
		);
	}

	if (!repos) {
		return <DashboardRepoListFallback {...props} />;
	}

	if (repos.length === 0) {
		return (
			<Grid placeItems="center" {...props}>
				<Heading size="md">Start building secure software today.</Heading>
			</Grid>
		);
	}

	return (
		<Grid templateAutoRows="1fr" templateColumns="repeat(4, 1fr)" gap={12} {...props}>
			{repos.map((repo) => (
				<LinkBox key={repo.id} as="article" gap={3} flexDirection="column" display="flex">
					<Center p={5} bgColor="primary.50" borderRadius="lg" textAlign="center" flex={1}>
						{/* <Text fontWeight="medium">{t('dashboard.lastAnalysis')}</Text> */}

						<Flex direction="column" gap={1}>
							<Text>Repo</Text>

							<Heading as="h3" size="sm">
								<LinkOverlay as={NextLink} href={`/repos/${repo.id}`}>
									{repo.fullName}
								</LinkOverlay>
							</Heading>

							<Text fontSize="xs">&#x23;{repo.id}</Text>
						</Flex>
					</Center>

					{/* <Heading as="h3" size="xs">
						<LinkOverlay as={NextLink} href={`/repos/${repo.id}`}>
							{repo.fullName}
						</LinkOverlay>
					</Heading> */}
				</LinkBox>
			))}
		</Grid>
	);
};
