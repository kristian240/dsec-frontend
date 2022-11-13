import { Button, Flex, Link } from '@chakra-ui/react';
import React, { FC } from 'react';
import NextLink from 'next/link';
import { useTranslation } from 'react-i18next';

interface IMainNavigationProps {}

export const MainNavigation: FC<IMainNavigationProps> = ({ ...rest }) => {
	const { t } = useTranslation();

	return (
		<Flex as="nav" justify="space-between" align="inherit" flex={1} {...rest}>
			<Flex align="inherit" gap={8}>
				<Link as={NextLink} href="/features">
					{t('label.feature_other')}
				</Link>
				<Link as={NextLink} href="/features">
					{t('label.aboutSsdlc')}
				</Link>
			</Flex>

			<Flex align="inherit" gap={8}>
				<Link as={NextLink} href="/features">
					{t('label.help')}
				</Link>
				<Link as={NextLink} href="/features">
					{t('label.logIn')}
				</Link>
				<Button as={NextLink} href="/features" variant="solid" borderRadius="full" colorScheme="primary">
					{t('label.signUp')}
				</Button>
			</Flex>
		</Flex>
	);
};
