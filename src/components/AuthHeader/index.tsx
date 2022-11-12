import { Box, Heading, Link, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const indexMap = { '/login': 0, '/register': 1 };
export default function AuthHeader() {
	const router = useRouter();

	return (
		<Box textAlign="center">
			<Heading as="b">DSEC</Heading>
			<Text>
				The simplest way to create <b>secure software</b>
			</Text>
			<Tabs isFitted index={indexMap[router.pathname]}>
				<TabList>
					<Tab as={NextLink} href="/login">
						Login
					</Tab>
					<Tab as={NextLink} href="/register">
						Register
					</Tab>
				</TabList>
			</Tabs>
		</Box>
	);
}
