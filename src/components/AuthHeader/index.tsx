import { Box, BoxProps, Flex, Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const AuthHeaderLink = ({ href, children }) => {
	const router = useRouter();

	return (
		<Box
			textAlign="center"
			flex={1}
			borderBottom="2px"
			borderColor="blue.100"
			aria-current={router.pathname === href ? 'page' : undefined}
			_activeLink={{
				borderColor: 'blue.500',
			}}
		>
			<Link as={NextLink} href={href} role={undefined}>
				{children}
			</Link>
		</Box>
	);
};

export default function AuthHeader(props: BoxProps) {
	return (
		<Box textAlign="center" {...props}>
			<Heading as="b">DSEC</Heading>
			<Text>
				The simplest way to create <b>secure software</b>
			</Text>

			<Flex mt={4}>
				<AuthHeaderLink href="/login">Login</AuthHeaderLink>
				<AuthHeaderLink href="/register">Register</AuthHeaderLink>
			</Flex>
		</Box>
	);
}
