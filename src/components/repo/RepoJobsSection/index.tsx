import { CompliantBadge } from '@/components/repo/RepoJobsSection/CompliantBadge';
import { TimeAgo } from '@/components/repo/RepoJobsSection/elements';
import { IRepo } from '@/interfaces/api/IRepo';
import { post } from '@/utils/network';
import { AddIcon, ExternalLinkIcon } from '@chakra-ui/icons';
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
	Link,
	Spinner,
	Text,
	VStack,
} from '@chakra-ui/react';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import { FC, useMemo } from 'react';
import useSWR from 'swr';
import useMutation from 'use-mutation';

interface IJob {
	id: number;
	startTime: string;
	endTime?: string;
	log?: Array<{
		author: string;
		commit: string;
		date: string;
		description: string;
		email: string;
		endColumn: number;
		endLine: number;
		entropy: number;
		file: string;
		fingerprint: string;
		match: string;
		message: string;
		ruleID: string;
		secret: string;
		startColumn: number;
		startLine: string;
		symlinkFile: string;
	}>;
	repo: IRepo;
}

interface IRepoJobsSectionProps extends BoxProps {
	repoId: string;
}

export const RepoJobsSection: FC<IRepoJobsSectionProps> = ({ repoId, ...rest }) => {
	const {
		data,
		error,
		mutate: mutateJobs,
	} = useSWR<Array<IJob>>(repoId ? `/api/job` : null, { refreshInterval: 1000 });
	const repoJobs = useMemo(
		() => data?.filter((job) => String(job.repo.id) === repoId).sort((a, b) => b.startTime.localeCompare(a.startTime)),
		[data, repoId]
	);

	const { data: repo } = useSWR(repoId ? `/api/repo/${repoId}` : null);
	const { data: mainBranch } = useSWR<IRepo>(
		repo ? repo.url : null,
		(url: string) =>
			fetch(url)
				.then((res) => res.json())
				.then((res) => res.default_branch),
		{ revalidateIfStale: false, revalidateOnFocus: false }
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

									<CompliantBadge log={job.log} />
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
								{job.log && job.log.length > 0 ? (
									<VStack align="stretch">
										{job.log.map((log) => {
											const parsedFile = log.file.split('/').slice(1).join('/');

											return (
												<Box key={log.fingerprint} borderLeft="1px" pl={2}>
													<Text>{log.description}</Text>
													<Text>
														<Button
															as={Link}
															rightIcon={<ExternalLinkIcon />}
															variant="link"
															color="primary.500"
															href={`${job.repo.htmlUrl}/blob/${mainBranch}/${parsedFile}#L${log.startLine}-L${log.endLine}`}
															isExternal
														>
															{parsedFile}
														</Button>
													</Text>
												</Box>
											);
										})}
									</VStack>
								) : (
									<Text>No logs to show</Text>
								)}
							</AccordionPanel>
						</AccordionItem>
					);
				})}
			</Accordion>
		</Box>
	);
};
