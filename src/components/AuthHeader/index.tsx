import { Box, Heading, Link, LinkOverlay, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

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
					<Tab>
						<Text>
							<Link as={NextLink} href="/login">
								Login
							</Link>
						</Text>
					</Tab>
					<Tab>
						<Text>
							<Link as={NextLink} href="/register">
								Register
							</Link>
						</Text>
					</Tab>
				</TabList>
			</Tabs>
		</Box>
	);
}
