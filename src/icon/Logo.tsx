import { Icon, IconProps } from '@chakra-ui/react';
import React, { FC } from 'react';

export const LogoSvg: FC<IconProps> = (props) => {
	return (
		<Icon color="primary.500" viewBox="0 0 38 39" {...props}>
			<path d="M0 .5h19a19 19 0 1 1-19 19V.5Z" fill="currentColor" />
		</Icon>
	);
};
