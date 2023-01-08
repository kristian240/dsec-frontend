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
	closeButtonText?: string;
	redirectLink: string;
}

export const ConfirmButton = ({
	onSuccessAction,
	buttonText,
	closeButtonText = 'Close',
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
			<Button onClick={onOpen} colorScheme={isDanger ? 'red' : undefined}>
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
							{closeButtonText}
						</Button>
						<Button colorScheme={isDanger ? 'red' : undefined} onClick={onSubmit}>
							{buttonText}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
