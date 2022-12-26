import { AuthRedirect } from '@/components/AuthRedirect/AuthRedirect';
import { CreateRepositorySteps, steps } from '@/components/new-repository/CreateRepositoryFormLayout/enums';
import { ChevronIcon } from '@/icon/ChevronIcon';
import { Box, BoxProps, Button, Center, Flex, Heading, useToast } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FC, ReactNode, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import useMutation from 'use-mutation';
import { createRepo, RepoFormValues } from './utils';

interface ICreateRepositoryFormLayoutProps extends BoxProps {
	steps: Partial<Record<CreateRepositorySteps, ReactNode>>;
}

export const CreateRepositoryFormLayout: FC<ICreateRepositoryFormLayoutProps> = ({ steps: renderSteps, ...props }) => {
	const { t } = useTranslation();
	const [stepIndex, setStepIndex] = useState(() => 0);
	const step = steps[stepIndex];
	const [stepClick, setStepClick] = useState(() => 0);
	const router = useRouter();
	const {
		handleSubmit,
		formState: { isValid },
	} = useFormContext<RepoFormValues>();
	const toast = useToast();

	const [onSubmit] = useMutation(createRepo, {
		onSuccess: () => {
			router.push('/dashboard');
		},
		onFailure: ({ error }) => {
			toast({ title: 'Ops! Something went wrong', status: 'error', description: error?.message });
		},
	});

	return (
		<>
			<AuthRedirect to="/login" />
			<Flex justify="space-between" direction="column" {...props}>
				<Box>
					<Heading as="h2" size="lg" mb={4} textAlign="center">
						{t(`createRepository.step.${step}.header`)}
					</Heading>

					{renderSteps[step]}
				</Box>

				<Box>
					<Flex justify="space-between" mb={4}>
						<Box>
							{stepIndex !== 0 ? (
								<Button
									isDisabled={!isValid}
									onClick={() => setStepIndex((p) => p - 1)}
									leftIcon={<ChevronIcon />}
									variant="link"
									colorScheme="primary"
								>
									Previous
								</Button>
							) : null}
						</Box>

						<Box>
							{stepIndex < steps.length - 1 ? (
								<Button
									isDisabled={!isValid}
									onClick={() => {
										setStepIndex((p) => p + 1);
										setStepClick((p) => (p < 3 ? p + 1 : null));
									}}
									rightIcon={<ChevronIcon transform="rotate(-180deg)" />}
									variant="link"
									colorScheme="primary"
								>
									Next
								</Button>
							) : (
								<Button
									isDisabled={!isValid}
									onClick={handleSubmit(onSubmit)}
									rightIcon={<ChevronIcon transform="rotate(-180deg)" />}
									variant="link"
									colorScheme="primary"
								>
									Finish
								</Button>
							)}
						</Box>
					</Flex>

					<Box position="relative">
						<Box zIndex="-1" position="absolute" insetX={0} top="50%" h="px" bg="primary.500" />

						<Flex justify="space-between">
							{steps.map((step, index) => (
								<Box
									as={Center}
									onClick={() => {
										isValid && index <= stepClick + 1 ? setStepIndex(index) : null;
										isValid && stepClick < index ? setStepClick(index) : null;
									}}
									key={step}
									border="2px"
									boxSize={12}
									borderRadius="full"
									bg="white"
									aria-current={stepIndex === index ? 'step' : undefined}
									_activeStep={{ bg: 'primary.500', color: 'white', borderColor: 'primary.500' }}
								>
									{index + 1}
								</Box>
							))}
						</Flex>
					</Box>
				</Box>
			</Flex>
		</>
	);
};
