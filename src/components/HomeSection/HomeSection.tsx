import { Box, Text, Heading, VStack } from '@chakra-ui/react';
import { StaticImageData } from 'next/image';
import { CSSProperties, FC } from 'react';

type Variant = {
	title: string;
	description: string;
	style: CSSProperties;
};

type Variants = {
	gdpr: Variant;
	flawDetection: Variant;
	collaboration: Variant;
};

const variants: Variants = {
	gdpr: {
		title: 'GDPR Compliance',
		description: 'Use DSEC to be sure that your software is compliant with GDPR laws.',
		style: { backgroundColor: '#00053E', color: 'white' },
		// img: {},
	},
	flawDetection: {
		title: 'Automatic Flaw Detection',
		description: 'Use DSEC to find security flaws in your software that could compromise the safety of your users.',
		style: { backgroundColor: '#BB82F8', color: '#161616' },
		// img: {},
	},
	collaboration: {
		title: 'Collaboration',
		description:
			'DSEC has been designed to enhance collaboration, get everyone in your team working as one – without disrupting their workflow.',
		style: { backgroundColor: '#AD691A', color: 'white' },
		// img: {},
	},
};

interface HomeSectionProps {
	variant: 'gdpr' | 'flawDetection' | 'collaboration';
}

const HomeSection: FC<HomeSectionProps> = ({ variant }) => {
	const { title, description, style } = variants[variant];
	return (
		<Box as="section" sx={commonStyles} style={style}>
			<VStack justifyContent="space-between" h="100%" alignItems="flex-start" maxW="50%">
				<Heading as="h3">{title}</Heading>
				<Text>{description}</Text>
				<div></div>
			</VStack>
		</Box>
	);
};

const commonStyles: CSSProperties = {
	height: 400,
	width: '100%',
	padding: '4rem 6rem',
	borderRadius: 36,
};

export default HomeSection;
