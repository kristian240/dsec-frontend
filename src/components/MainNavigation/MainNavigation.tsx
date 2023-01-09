import { logout } from '@/components/MainNavigation/utils';
import { useUser } from '@/hooks/useUser';
import { ChevronCircleIcon } from '@/icon/ChevronCircleIcon';
import { Button, Flex, FlexProps, IconButton, Link, MenuDivider } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';

// dynamically import components used when user is logged in
const Menu = dynamic(() => import('@chakra-ui/react').then((mod) => mod.Menu));
const MenuButton = dynamic(() => import('@chakra-ui/react').then((mod) => mod.MenuButton));
const MenuItem = dynamic(() => import('@chakra-ui/react').then((mod) => mod.MenuItem));
const MenuList = dynamic(() => import('@chakra-ui/react').then((mod) => mod.MenuList));

export const MainNavigation: FC<FlexProps> = (props) => {
	const { t } = useTranslation('common');
	const { data } = useUser();
	const { cache } = useSWRConfig();
	const router = useRouter();

	const [handleLogout] = useMutation(logout, {
		onSuccess: () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore `clear` exists on `cache` but is not in the type definition
			cache.clear();
			router.push('/');
		},
	});

	return (
		<Flex as="nav" justify="space-between" align="inherit" flex={1} {...props}>
			<Flex align="inherit" gap={8}>
				<Link as={NextLink} href="/wiki">
					{t('label.aboutSsdlc')}
				</Link>
			</Flex>

			<Flex align="inherit" gap={8}>
				<Link as={NextLink} href="/help">
					{t('label.help')}
				</Link>

				{data ? (
					<>
						<Link as={NextLink} href="/dashboard">
							Dashboard
						</Link>

						<Menu>
							<MenuButton as={IconButton} variant="unstyled" icon={<ChevronCircleIcon boxSize={10} />} />

							<MenuList>
								<MenuItem as={NextLink} href="/profile">
									Profile
								</MenuItem>

								<MenuItem as={NextLink} href="/repos/github">
									{t('label.github')}
								</MenuItem>
								<MenuDivider />
								<MenuItem onClick={handleLogout}>Log out</MenuItem>
							</MenuList>
						</Menu>
					</>
				) : (
					<>
						<Link as={NextLink} href="/login">
							{t('label.logIn')}
						</Link>
						<Button as={NextLink} href="/register" variant="solid" borderRadius="full" colorScheme="primary">
							{t('label.signUp')}
						</Button>
					</>
				)}
			</Flex>
		</Flex>
	);
};
