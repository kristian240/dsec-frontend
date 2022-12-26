import { Box } from '@chakra-ui/layout';
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

interface ConfirmButtonProps {
	onSuccessAction: () => void;
	headerText: string;
	bodyText: string;
	buttonText: string;
	isDanger?: boolean;
	redirectLink: string;
}

export const ConfirmButton = ({
	onSuccessAction,
	buttonText,
	headerText,
	bodyText,
	isDanger,
	redirectLink,
}: ConfirmButtonProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();

	const onSubmit = () => {
		onSuccessAction();
		onClose();
		router.push(redirectLink);
	};

	return (
		<>
			<Button onClick={onOpen} colorScheme={isDanger ? 'red' : ''}>
				{buttonText}
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{headerText}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box>{bodyText}</Box>
					</ModalBody>

					<ModalFooter>
						<Button variant="ghost" onClick={onClose} mr={3}>
							Close
						</Button>
						<Button colorScheme={isDanger ? 'red' : ''} onClick={onSubmit}>
							{buttonText}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
