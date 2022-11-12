import { Box, Heading, LinkBox, LinkOverlay, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
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
					<Tab>
						<LinkBox>
							<LinkOverlay href="/login">Login</LinkOverlay>
						</LinkBox>
					</Tab>
					<Tab>
						<LinkBox>
							<LinkOverlay href="/register">Register</LinkOverlay>
						</LinkBox>
					</Tab>
				</TabList>
			</Tabs>
		</Box>
	);
}
