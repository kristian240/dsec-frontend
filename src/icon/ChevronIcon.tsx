import { Icon, IconProps } from '@chakra-ui/react';
import React, { FC } from 'react';

export const ChevronIcon: FC<IconProps> = (props) => {
	return (
		<Icon color="primary.500" viewBox="0 0 24 24" {...props}>
			<path
				d="M16 4.4c.3.3.4.6.4 1s-.1.7-.4 1L10.4 12l5.6 5.6c.3.3.4.6.4 1s-.1.7-.4 1c-.3.3-.6.4-1 .4s-.7-.1-1-.4L7.4 13c-.1-.1-.3-.3-.3-.5a1.6 1.6 0 0 1 0-1c0-.2.2-.4.3-.5L14 4.4c.3-.3.6-.4 1-.4s.7.1 1 .4Z"
				fill="currentColor"
			/>
		</Icon>
	);
};
