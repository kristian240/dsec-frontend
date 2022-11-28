import { Box, HStack, Text } from '@chakra-ui/react';
import Image, { StaticImageData } from 'next/image';
import { CSSProperties } from 'react';
import Deployment from '@/images/deployment.png';
import Design from '@/images/design.png';
import Requirements from '@/images/requirements.png';
import Testing from '@/images/testing.png';
import Development from '@/images/development.png';

export enum Topics {
	Requirements,
	Design,
	Development,
	Testing,
	Deployment,
}

interface TopicProps {
	variant: Topics;
}

const Topic: React.FC<TopicProps> = ({ variant }) => {
	const { img, bg, title, url } = Variants[variant];

	return (
		<HStack as="a" sx={styles} bg={bg} href={url}>
			<Text>{title}</Text>
			<Image src={img} alt="" height={100} width={150} />
		</HStack>
	);
};

const styles = {
	alignItems: 'center',
	justifyContent: 'space-between',
	borderRadius: 25,
	padding: '10px 16px 10px 32px',
	width: 341,
	height: 142,
	color: 'white',
	boxSizing: 'border-box',
} as CSSProperties;

const Variants: { img: StaticImageData; bg: string; title: string; url: string }[] = [
	{
		img: Requirements,
		bg: '#4042E2',
		title: 'Requirements',
		url: '/wiki/requirements',
	},
	{
		img: Design,
		bg: '#FF8077',
		title: 'Design',
		url: '/wiki/requirements',
	},
	{
		img: Development,
		bg: '#7D97F4',
		title: 'Development',
		url: '/wiki/requirements',
	},
	{
		img: Testing,
		bg: '#A13976',
		title: 'Testing',
		url: '/wiki/requirements',
	},
	{
		img: Deployment,
		bg: '#F29A33',
		title: 'Deployment',
		url: '/wiki/requirements',
	},
];

export default Topic;
