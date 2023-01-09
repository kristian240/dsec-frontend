import { StaticImageData } from 'next/image';

export type Step = {
	title: string;
	text: string;
	substeps?: Step[];
};

export type HelpProps = {
	title: string;
	img: StaticImageData;
	steps: Step[];
};
