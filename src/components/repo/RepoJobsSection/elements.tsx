import { CheckIcon } from '@chakra-ui/icons';
import { AlertIcon, Spinner, Tag, TagLabel, TagLeftIcon, TagProps } from '@chakra-ui/react';
import { FC, useEffect, useReducer } from 'react';
import { format } from 'timeago.js';

export const TimeAgo = ({ date }: { date: Date }) => {
	const rerender = useReducer(() => ({}), {})[1];

	useEffect(() => {
		const intervalDuration = Date.now() - date.getTime() > 60_000 ? 60_0000 : 2000;

		const interval = setInterval(() => {
			rerender();
		}, intervalDuration);

		return () => clearInterval(interval);
	}, [date, rerender]);

	return <>{format(date)}</>;
};

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
