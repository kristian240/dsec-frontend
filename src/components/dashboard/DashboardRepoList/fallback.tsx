import { Flex, FlexProps, Grid, GridProps, Skeleton } from '@chakra-ui/react';
import { FC } from 'react';

export const DashboardRepoListItemFallback: FC<FlexProps> = (props) => (
	<Flex direction="column" gap={2} {...props}>
		<Skeleton w="full" flex={6} borderRadius="lg" />
	</Flex>
);

export const DashboardRepoListFallback: FC<GridProps> = (props) => {
	return (
		<Grid templateColumns="repeat(4, 1fr)" gap={12} {...props}>
			<DashboardRepoListItemFallback />
			<DashboardRepoListItemFallback />
			<DashboardRepoListItemFallback />
			<DashboardRepoListItemFallback />
		</Grid>
	);
};
