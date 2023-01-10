import { CompliantBadge, TimeAgo, ToolOutput } from '@/components/repo/RepoJobsSection/elements';
import { IJob } from '@/interfaces/api/IJob';
import { post } from '@/utils/network';
import { AddIcon } from '@chakra-ui/icons';
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	BoxProps,
	Button,
	Center,
	Flex,
	Heading,
	Spinner,
	Text,
} from '@chakra-ui/react';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import { FC, useMemo } from 'react';
import useSWR from 'swr';
import useMutation from 'use-mutation';

interface IRepoJobsSectionProps extends BoxProps {
	repoId: string;
}

export const RepoJobsSection: FC<IRepoJobsSectionProps> = ({ repoId, ...rest }) => {
	const {
		data,
		error,
		mutate: mutateJobs,
	} = useSWR<Array<IJob>>(repoId ? `/api/repo/${repoId}/jobs` : null, { refreshInterval: 1000 });

	const repoJobs = useMemo(
		() => data?.filter((job) => String(job.repo.id) === repoId).sort((a, b) => b.startTime.localeCompare(a.startTime)),
		[data, repoId]
	);

	const [startAnalysis, { status }] = useMutation(() => post(`/api/repo/trigger/${repoId}`), {
		onSuccess: () => {
			mutateJobs();
		},
	});

	if (error) {
		return (
			<Flex direction="column" align="center" gap={4} {...rest}>
				<Text fontSize="xl">Error occurred while fetching the jobs.</Text>
			</Flex>
		);
	}

	if (!repoJobs) {
		return (
			<Center {...rest}>
				<Spinner />
			</Center>
		);
	}

	if (repoJobs.length === 0) {
		return (
			<Box>
				<Heading size="lg" mb={2}>
					Jobs
				</Heading>

				<Text fontSize="xl">
					Analysis not started.{' '}
					<Button variant="link" onClick={startAnalysis} size="xl" colorScheme="primary">
						Start analysis
					</Button>
				</Text>
			</Box>
		);
	}

	return (
		<Box>
			<Flex justify="space-between" py={1}>
				<Heading size="lg" mb={2}>
					Jobs
				</Heading>

				<Button
					variant="link"
					onClick={startAnalysis}
					isLoading={status === 'running'}
					size="xl"
					colorScheme="primary"
					rightIcon={<AddIcon />}
				>
					Start analysis
				</Button>
			</Flex>

			<Accordion allowToggle>
				{repoJobs.map((job, index, self) => {
					return (
						<AccordionItem key={job.id}>
							<AccordionButton>
								<Box flex={1} m={2} textAlign="left">
									<Box as="span" mr={2}>
										Job #{self.length - index}
									</Box>

									<CompliantBadge compliant={job.compliant} />
								</Box>

								{job.endTime ? (
									<Box as="span">
										Ended <TimeAgo date={utcToZonedTime(new Date(job.endTime), 'UTC')} />
									</Box>
								) : (
									<Box as="span">
										Started <TimeAgo date={utcToZonedTime(new Date(job.startTime), 'UTC')} />
									</Box>
								)}
								<AccordionIcon />
							</AccordionButton>

							<AccordionPanel pb={4}>
								<ToolOutput job={job} />
							</AccordionPanel>
						</AccordionItem>
					);
				})}
			</Accordion>
		</Box>
	);
};
