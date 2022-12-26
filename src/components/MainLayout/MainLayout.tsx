import { LogoSvg } from '@/icon/Logo';
import { Box, BoxProps, Container, Flex, FlexProps, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { FC } from 'react';

interface IMainLayoutProps extends FlexProps {
	navigation?: React.ReactNode;
	containerProps?: BoxProps;
}

export const MainLayout: FC<IMainLayoutProps> = ({ navigation, children, containerProps, ...rest }) => {
	return (
		<Flex direction="column" minH="100vh" {...rest}>
			<Container as="header" maxW="container.lg">
				<Flex py={6} align="center" gap={8}>
					<Link as={NextLink} href="/" aria-label="Home">
						<LogoSvg boxSize={10} />
					</Link>

					{navigation}
				</Flex>
			</Container>

			<Box flex={1} as="main" {...containerProps}>
				{children}
			</Box>
		</Flex>
	);
};
