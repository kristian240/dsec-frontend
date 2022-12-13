import { CheckIcon } from '@chakra-ui/icons';
import { AlertIcon, Spinner, Tag, TagLabel, TagLeftIcon, TagProps } from '@chakra-ui/react';
import React, { FC } from 'react';

interface ICompliantBadgeProps extends TagProps {
	log?: Array<any>;
}

export const CompliantBadge: FC<ICompliantBadgeProps> = ({ log, ...rest }) => {
	if (!log) {
		return (
			<Tag colorScheme="gray" {...rest}>
				<TagLeftIcon as={Spinner} />
				<TagLabel>Processing...</TagLabel>
			</Tag>
		);
	}

	if (log.length === 0) {
		return (
			<Tag colorScheme="green" {...rest}>
				<TagLeftIcon as={CheckIcon} />
				<TagLabel>Compliant</TagLabel>
			</Tag>
		);
	}

	return (
		<Tag colorScheme="yellow" {...rest}>
			<TagLeftIcon as={AlertIcon} />
			<TagLabel>Not Compliant</TagLabel>
		</Tag>
	);
};
