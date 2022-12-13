import { Icon, IconProps } from '@chakra-ui/react';
import React, { FC } from 'react';

export const ChevronCircleIcon: FC<IconProps> = (props) => {
	return (
		<Icon color="primary.500" viewBox="0 0 45 45" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M22.5 0a22.5 22.5 0 1 0 0 45 22.5 22.5 0 0 0 0-45Zm-9.25 19.33 6.34 9.5a3.5 3.5 0 0 0 5.82 0l6.34-9.5-2.5-1.66-6.33 9.5a.5.5 0 0 1-.84 0l-6.33-9.5-2.5 1.66Z"
				fill="currentColor"
			/>
		</Icon>
	);
};
