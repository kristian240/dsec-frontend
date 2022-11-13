import { LogoSvg } from '@/icon/Logo';
import { Box, Container, Flex, FlexProps } from '@chakra-ui/react';
import React, { FC } from 'react';

interface IMainLayoutProps extends FlexProps {
	navigation?: React.ReactNode;
}

export const MainLayout: FC<IMainLayoutProps> = ({ navigation, children, ...rest }) => {
	return (
		<Flex direction="column">
			<Container as="header" maxW="1280px">
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
