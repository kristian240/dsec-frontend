import { Button, ButtonProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';

export const AddRepo: FC<ButtonProps> = (props) => {
	return (
		<Button as={NextLink} href="/repos/new" borderRadius="full" minW="300px" colorScheme="blue" {...props}>
			New Repo
		</Button>
	);
};
