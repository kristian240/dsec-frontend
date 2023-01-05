import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Spinner, Tag, TagLabel, TagLeftIcon, TagProps } from '@chakra-ui/react';
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
	loading?: boolean;
	compliant?: boolean;
}

export const CompliantBadge: FC<ICompliantBadgeProps> = ({ compliant, loading, ...rest }) => {
	if (loading) {
		return (
			<Tag colorScheme="gray" {...rest}>
				<TagLeftIcon as={Spinner} />
				<TagLabel>Processing...</TagLabel>
			</Tag>
		);
	}

	if (compliant) {
		return (
			<Tag colorScheme="green" {...rest}>
				<TagLeftIcon as={CheckIcon} />
				<TagLabel>Compliant</TagLabel>
			</Tag>
		);
	}

	return (
		<Tag colorScheme="red" {...rest}>
			<TagLeftIcon as={WarningTwoIcon} />
			<TagLabel>Not Compliant</TagLabel>
		</Tag>
	);
};
