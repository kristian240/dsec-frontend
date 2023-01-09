import { Text, Heading, VStack, HStack } from '@chakra-ui/react';
import Image, { StaticImageData } from 'next/image';
import { CSSProperties, FC } from 'react';
import Gdpr from '../../images/gdpr.png';
import Security from '../../images/security.png';

type Variant = {
	title: string;
	description: string;
	style: CSSProperties;
	img: StaticImageData;
};

type Variants = {
	gdpr: Variant;
	flawDetection: Variant;
};

const variants: Variants = {
	gdpr: {
		title: 'GDPR Compliance',
		description: 'Use DSEC to be sure that your software is compliant with GDPR laws.',
		style: { backgroundColor: '#00053E', color: 'white' },
		img: Gdpr,
	},
	flawDetection: {
		title: 'Automatic Flaw Detection',
		description: 'Use DSEC to find security flaws in your software that could compromise the safety of your users.',
		style: { backgroundColor: '#BB82F8', color: '#161616' },
		img: Security,
	},
};

interface HomeSectionProps {
	variant: 'gdpr' | 'flawDetection';
}

const HomeSection: FC<HomeSectionProps> = ({ variant }) => {
	const { title, description, style, img } = variants[variant];
	return (
		<HStack as="section" sx={commonStyles} style={style}>
			<VStack justifyContent="space-between" h="100%" alignItems="flex-start" maxW="50%">
				<Heading as="h3" className="albra">
					{title}
				</Heading>
				<Text>{description}</Text>
				<div></div>
			</VStack>
			<Image src={img} alt="" height={270} width={400} role="presentation" />
		</HStack>
	);
};

const commonStyles: CSSProperties = {
	height: 400,
	width: '100%',
	padding: '4rem 6rem',
	borderRadius: 36,
};

export default HomeSection;
