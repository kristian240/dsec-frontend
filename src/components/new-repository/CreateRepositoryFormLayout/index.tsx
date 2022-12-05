import { CreateRepositorySteps, steps } from '@/components/new-repository/CreateRepositoryFormLayout/enums';
import { ChevronIcon } from '@/icon/ChevronIcon';
import { Box, BoxProps, Button, Center, Flex, Heading } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { FC, ReactNode, useState } from 'react';

interface ICreateRepositoryFormLayoutProps extends BoxProps {
	steps: Partial<Record<CreateRepositorySteps, ReactNode>>;
}

export const CreateRepositoryFormLayout: FC<ICreateRepositoryFormLayoutProps> = ({ steps: renderSteps, ...props }) => {
	const { t } = useTranslation();
	const [stepIndex, setStepIndex] = useState(() => 0);
	const step = steps[stepIndex];

	return (
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
						{stepIndex < steps.length ? (
							<Button
								onClick={() => setStepIndex((p) => p + 1)}
								rightIcon={<ChevronIcon transform="rotate(-180deg)" />}
								variant="link"
								colorScheme="primary"
							>
								{stepIndex === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						) : null}
					</Box>
				</Flex>

				<Box position="relative">
					<Box zIndex="-1" position="absolute" insetX={0} top="50%" h="px" bg="primary.500" />

					<Flex justify="space-between">
						{steps.map((step, index) => (
							<Box
								as={Center}
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
	);
};
