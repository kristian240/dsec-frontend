import { LogoSvg } from '@/icon/Logo';
import { Box, Container, Flex, FlexProps } from '@chakra-ui/react';
import React, { FC } from 'react';

interface IMainLayoutProps extends FlexProps {
	navigation?: React.ReactNode;
}

export const MainLayout: FC<IMainLayoutProps> = ({ navigation, children, ...rest }) => {
	return (
		<Flex direction="column" minH="100vh">
			<Container as="header" maxW="container.xl">
				<Flex py={6} align="center">
					<LogoSvg boxSize={10} mr={16} />

					{navigation}
				</Flex>
			</Container>

			<Box flex={1} as="main">
				{children}
			</Box>
		</Flex>
	);
};
