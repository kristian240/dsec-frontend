import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import ReadMore from '@/components/wiki/ReadMore';
import Topic, { Topics } from '@/components/wiki/Topic';
import { Container, Heading, Flex, Text } from '@chakra-ui/react';
import { InferGetStaticPropsType, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type WikiPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Wiki: NextPage<WikiPageProps> = () => {
	return (
		<MainLayout navigation={<MainNavigation />}>
			<Container maxW="800px" mt={16}>
				<Heading as="h2">Requirements</Heading>
				<br />
				<Text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id ullamcorper augue. Pellentesque suscipit
					sem nibh, et ullamcorper arcu sollicitudin in. Curabitur mollis purus eget commodo pharetra. Sed gravida, orci
					eget eleifend tempor, ante enim scelerisque massa, non ullamcorper dolor elit id sem. Donec non mauris
					sodales, rhoncus ipsum non, consequat nibh. Quisque tincidunt iaculis nunc, quis varius ipsum auctor volutpat.
				</Text>
				<br />
				<br />
				<Heading as="h3" fontSize={24}>
					Aliquam congue, turpis quis iaculis
				</Heading>
				<br />
				<Text>
					Augue quam semper quam, vel hendrerit tortor tellus nec ipsum. Nullam urna ante, tempor commodo libero sed,
					aliquam molestie turpis. Nam facilisis tellus ac velit ultricies aliquet. Donec luctus mi eget metus
					venenatis, a ullamcorper nulla ornare. Proin a turpis nec magna venenatis elementum eget sit amet elit. Cras
					auctor a augue sed facilisis. Aenean semper metus urna, sit amet feugiat magna sodales varius. Nullam
					dignissim elit eget nisl euismod malesuada. Vivamus ornare elit eu nibh interdum iaculis ut nec urna
				</Text>

				<br />
				<br />
				<ReadMore activeTopic={Topics.Requirements} />
			</Container>
		</MainLayout>
	);
};

export const getStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(String(locale), ['common'])),
		},
	};
};

export default Wiki;
