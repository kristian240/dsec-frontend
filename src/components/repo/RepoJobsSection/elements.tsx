import { IBanditJob, IFlawFinderJob, IGitLeaksJob, IGoKartJob, IJob, IProgPilotJob } from '@/interfaces/api/IJob';
import { CheckIcon, ExternalLinkIcon, WarningTwoIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Link,
	Spinner,
	StackProps,
	SystemProps,
	Tag,
	TagLabel,
	TagLeftIcon,
	TagProps,
	Text,
	VStack,
} from '@chakra-ui/react';
import { FC, useEffect, useReducer } from 'react';
import { format } from 'timeago.js';

export const TimeAgo = ({ date }: { date: Date }) => {
	const rerender = useReducer(() => ({}), {})[1];

	useEffect(() => {
		const intervalDuration = Date.now() - date.getTime() > 60_000 ? 60_0000 : 2000;

		const interval = setInterval(() => {
			rerender();
		}, intervalDuration);

		return () => clearInterval(interval);
	}, [date, rerender]);

	return <>{format(date)}</>;
};

interface ICompliantBadgeProps extends TagProps {
	loading?: boolean;
	compliant?: boolean;
}

export const CompliantBadge: FC<ICompliantBadgeProps> = ({ compliant, loading, ...rest }) => {
	if (loading) {
		return (
			<Tag colorScheme="gray" {...rest}>
				<TagLeftIcon as={Spinner} />
				<TagLabel>Processing...</TagLabel>
			</Tag>
		);
	}

	if (compliant) {
		return (
			<Tag colorScheme="green" {...rest}>
				<TagLeftIcon as={CheckIcon} />
				<TagLabel>Compliant</TagLabel>
			</Tag>
		);
	}

	return (
		<Tag colorScheme="red" {...rest}>
			<TagLeftIcon as={WarningTwoIcon} />
			<TagLabel>Not Compliant</TagLabel>
		</Tag>
	);
};

interface IToolOutput extends SystemProps {
	job?: IJob;
}

export const ToolOutput: FC<IToolOutput> = ({ job, ...rest }) => {
	if (job.tool.toolName === 'GITLEAKS') {
		if (!(job.log as IGitLeaksJob)?.results.length) return <Text {...rest}>No logs to show</Text>;

		return (
			<VStack align="stretch" {...rest}>
				{(job.log as IGitLeaksJob).results.map((log) => {
					const parsedFile = log.file?.split('/').slice(1).join('/');

					return (
						<Box key={log.fingerprint} borderLeft="1px" pl={2}>
							<Text>{log.description}</Text>
							<Text>
								<Button
									as={Link}
									rightIcon={<ExternalLinkIcon />}
									variant="link"
									color="primary.500"
									href={`${job.repo.htmlUrl}/blob/${job.repo.defaultBranch}/${parsedFile}#L${log.startLine}-L${log.endLine}`}
									isExternal
								>
									{parsedFile}
								</Button>
							</Text>
						</Box>
					);
				})}
			</VStack>
		);
	}

	if (job.tool.toolName === 'PROGPILOT' || job.tool.toolName === 'GOKART') {
		if (!(job.log as IProgPilotJob | IGoKartJob)?.results.length) return <Text {...rest}>No logs to show</Text>;

		return (
			<VStack align="stretch" {...rest}>
				{(job.log as IProgPilotJob | IGoKartJob).results.map((log) => {
					const parsedFile = log.sinkFile?.split(/\d{1,2}:\d{1,2}:\d{1,2}\.\d+/)?.[1];

					return (
						<Box key={log.vulnId} borderLeft="1px" pl={2}>
							<Text>
								<Link
									href={`https://www.cvedetails.com/cwe-details/${log.vulnCwe?.split('_')?.[1]}/cwe.html`}
									isExternal
								>
									{log.vulnName} | {log.vulnCwe}
								</Link>
							</Text>
							<Text>
								<Button
									as={Link}
									rightIcon={<ExternalLinkIcon />}
									variant="link"
									color="primary.500"
									href={`${job.repo.htmlUrl}/blob/${job.repo.defaultBranch}${parsedFile}#L${log.sinkLine}`}
									isExternal
								>
									{parsedFile}
								</Button>
							</Text>
						</Box>
					);
				})}
			</VStack>
		);
	}

	if (job.tool.toolName === 'BANDIT') {
		if (!(job.log as IBanditJob)?.results.length) return <Text {...rest}>No logs to show</Text>;

		return (
			<VStack align="stretch" {...rest}>
				{(job.log as IBanditJob).results.map((log) => {
					const parsedFile = log.sinkFile?.split(/\d{1,2}:\d{1,2}:\d{1,2}\.\d+/)?.[1];

					return (
						<Box key={log.vulnId} borderLeft="1px" pl={2}>
							<Text>
								<Link
									href={`https://www.cvedetails.com/cwe-details/${log.vulnCwe?.split('_')?.[1]}/cwe.html`}
									isExternal
								>
									{log.vulnName} | {log.vulnCwe}
								</Link>
							</Text>
							<Text>
								<Button
									as={Link}
									rightIcon={<ExternalLinkIcon />}
									variant="link"
									color="primary.500"
									href={`${job.repo.htmlUrl}/blob/${job.repo.defaultBranch}${parsedFile}#L${log.sinkLine}`}
									isExternal
								>
									{parsedFile}
								</Button>
							</Text>
						</Box>
					);
				})}
			</VStack>
		);
	}

	if (job.tool.toolName === 'FLAWFINDER') {
		if (!(job.log as IFlawFinderJob)?.runs?.[0]?.results?.length) return <Text {...rest}>No logs to show</Text>;

		return (
			<VStack align="stretch" {...rest}>
				{(job.log as IFlawFinderJob).runs[0].results.map((log) => {
					const cwe = log.message.text?.match(/CWE-(\d+)/)?.[1];
					const parsedFile =
						log.locations[0].physicalLocation?.artifactLocation?.uri?.split(/\d{1,2}:\d{1,2}:\d{1,2}\.\d+/)?.[1];

					return (
						<Box key={log.message.text} borderLeft="1px" pl={2}>
							<Text>
								<Link href={`https://www.cvedetails.com/cwe-details/${cwe}/cwe.html`} isExternal>
									CWE-{cwe}
								</Link>
							</Text>
							<Text>
								<Button
									as={Link}
									rightIcon={<ExternalLinkIcon />}
									variant="link"
									color="primary.500"
									href={`${job.repo.htmlUrl}/blob/${job.repo.defaultBranch}${parsedFile}#L${
										log.locations[0].physicalLocation?.region?.startLine
									}-L${
										log.locations[0].physicalLocation?.region?.endLine ||
										log.locations[0].physicalLocation?.region?.startLine
									}`}
									isExternal
								>
									{parsedFile}
								</Button>
							</Text>
						</Box>
					);
				})}
			</VStack>
		);
	}

	return null;
};
