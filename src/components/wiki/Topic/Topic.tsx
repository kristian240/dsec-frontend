import Deployment from '@/images/deployment.png';
import Design from '@/images/design.png';
import Development from '@/images/development.png';
import Requirements from '@/images/requirements.png';
import Testing from '@/images/testing.png';
import { HStack, Text } from '@chakra-ui/react';
import Image, { StaticImageData } from 'next/image';
import { CSSProperties, FC } from 'react';

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

const Topic: FC<TopicProps> = ({ variant }) => {
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
		url: '/wiki/example',
	},
	{
		img: Design,
		bg: '#FF8077',
		title: 'Design',
		url: '/wiki/example',
	},
	{
		img: Development,
		bg: '#7D97F4',
		title: 'Development',
		url: '/wiki/example',
	},
	{
		img: Testing,
		bg: '#A13976',
		title: 'Testing',
		url: '/wiki/example',
	},
	{
		img: Deployment,
		bg: '#F29A33',
		title: 'Deployment',
		url: '/wiki/example',
	},
];

export default Topic;
