import { Help } from '@/components/Help';
import { HelpProps } from '@/components/Help/utils';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import { MainNavigation } from '@/components/MainNavigation/MainNavigation';
import UserHeader from '@/images/userheader.png';
import VisitorHeader from '@/images/visitorheader.png';
import { Container } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const variants: HelpProps[] = [
	{
		title: 'Visitor',
		img: VisitorHeader,
		steps: [
			{
				title: 'Home page',
				text: 'Click on the logo icon to get redirected to the home page.',
			},
			{
				title: 'About SSDLC',
				text: 'Explore SSDLC wiki. Check some tips for every phase of SSDLC.',
			},
			{
				title: 'Help',
				text: 'Get some help on how to use our app.',
			},
			{
				title: 'Log in and Sign up',
				text: 'Register as a new user and log in to our app.',
			},
		],
	},
	{
		title: 'User',
		img: UserHeader,
		steps: [
			{
				title: 'Dashboard',
				text: 'Check your added repositories and add a new one.',
				substeps: [
					{
						title: 'Created repos',
						text: 'Check the list of repositories you added to our app.',
					},
					{
						title: 'Check repo details',
						text: 'Check repository details and analysis results or delete your repository.',
					},
					{
						title: 'Start analysis',
						text: 'Start a new analysis on your repository. Check the result of the analysis and logs that show where you need to fix your code.',
					},
					{
						title: 'Create new repo',
						text: 'Create a new repository that you want to check.',
					},
				],
			},
			{
				title: 'User profile',
				text: 'Click on the chevron icon to open the dropdown.',
				substeps: [
					{
						title: 'Profile',
						text: 'Check and edit your profile data or delete your profile.',
					},
					{
						title: 'GitHub',
						text: 'Integrate with GitHub to start analysis on your repositories.',
					},
					{
						title: 'Log out',
						text: 'Log out from our app.',
					},
				],
			},
		],
	},
];

function HelpPage() {
	return (
		<MainLayout navigation={<MainNavigation />}>
			<Container maxW="container.xl">
				{variants.map((value: HelpProps) => {
					return <Help key={value.title} {...value}></Help>;
				})}
			</Container>
		</MainLayout>
	);
}

export const getServerSideProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

export default HelpPage;
