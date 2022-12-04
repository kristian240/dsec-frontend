import { useUser } from '@/hooks/useUser';
import { Box, BoxProps, Heading, HeadingProps } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

export const DashboardHeader: FC<BoxProps> = (props) => {
	const { t } = useTranslation('common');
	const { data } = useUser();

	if (!data) {
		return null;
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
