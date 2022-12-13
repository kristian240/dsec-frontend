import { useUser } from '@/hooks/useUser';
import { Box, BoxProps, Heading, Skeleton } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';

export const DashboardHeader: FC<BoxProps> = (props) => {
	const { t } = useTranslation('common');
	const { data } = useUser();

	if (!data) {
		return (
			<Box {...props}>
				<Skeleton h={12} w="50%" borderRadius="lg" />
				<Skeleton h={9} mt={6} w="40%" borderRadius="lg" />
			</Box>
		);
	}

	return (
		<Box as="header" {...props}>
			<Heading as="h2" size="2xl">
				{t('common.title', { name: data?.firstName })}
			</Heading>
			<Heading as="h3" size="lg" mt={6}>
				{t('common.dashboard')}
			</Heading>
		</Box>
	);
};
