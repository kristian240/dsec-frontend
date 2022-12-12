import { IRepo } from '@/interfaces/api/IRepo';
import { post } from '@/utils/network';
import { ExternalLinkIcon } from '@chakra-ui/icons';
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
import NextLink from 'next/link';
import { FC, useMemo } from 'react';
import useSWR from 'swr';
import useMutation from 'use-mutation';

interface IJob {
	id: number;
	startTime: string;
	endTime: string;
	log: Array<{
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
	const { data, error } = useSWR<Array<IJob>>(repoId ? `/api/job` : null);
	// const { data: repoJobs, error } = useSWR<Array<IJob>>(repoId ? `/api/repo/${repoId}/jobs` : null);
	const repoJobs = useMemo(
		() => data?.filter((job) => String(job.repo.id) === repoId).sort((a, b) => a.startTime.localeCompare(b.startTime)),
		[data, repoId]
	);

	const [startAnalysis] = useMutation(() => post(`/api/repo/trigger/${repoId}`));

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
			<Heading size="lg" mb={2}>
				Jobs
			</Heading>

			<Accordion allowToggle>
				{repoJobs.map((job, index, self) => {
					return (
						<AccordionItem key={job.id}>
							<AccordionButton>
								<Box as="span" flex="1" textAlign="left">
									Job #{self.length - index}
								</Box>
								<AccordionIcon />
							</AccordionButton>

							<AccordionPanel pb={4}>
								{job.log.length > 0 ? (
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
															href={`${job.repo.htmlUrl}/blob/main/${parsedFile}#L${log.startLine}-L${log.endLine}`}
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
