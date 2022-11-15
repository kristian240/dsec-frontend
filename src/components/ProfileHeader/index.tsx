import { useUser } from '@/hooks/useUser';
import { Heading, HeadingProps } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

export const ProfileHeader: FC<HeadingProps> = (props) => {
	const { t } = useTranslation('common');
	const { data } = useUser();

	if (!data) {
		return null;
	}

	return (
		<Heading as="h2" textAlign="center" {...props}>
			{t('profilePage.title', { name: data?.firstName })}
		</Heading>
	);
};
