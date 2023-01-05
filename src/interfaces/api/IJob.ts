import type { IRepo } from '@/interfaces/api/IRepo';

interface IGitLeaksJob {
	results: Array<{
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
}

interface IGoKartJob {
	results: Array<{
		sinkColumn: number;
		sinkFile: string;
		sinkLine: number;
		sinkName: string;
		sourceColumn: Array<number>;
		sourceFile: Array<string>;
		sourceLine: Array<number>;
		sourceName: Array<string>;
		vulnCwe: string;
		vulnId: string;
		vulnName: string;
		vulnType: string;
	}>;
}

interface IProgPilotJob extends IGoKartJob {}

interface IBanditJob {
	errors: Array<{
		filename: string;
		reason: string;
	}>;
	metrics: Array<{
		confidenceHigh: number;
		confidenceLow: number;
		confidenceMedium: number;
		confidenceUndefined: number;
		severityHigh: number;
		severityLow: number;
		severityMedium: number;
		severityUndefined: number;
		loc: number;
		nosec: number;
		skippedTests: number;
	}>;
	results: Array<{
		sinkColumn: number;
		sinkFile: string;
		sinkLine: number;
		sinkName: string;
		sourceColumn: Array<number>;
		sourceFile: Array<string>;
		sourceLine: Array<number>;
		sourceName: Array<string>;
		vulnCwe: string;
		vulnId: string;
		vulnName: string;
		vulnType: string;
	}>;
}

export interface IJob {
	id: number;
	startTime: string;
	endTime?: string;
	compliant: boolean;
	log?: IGitLeaksJob | IGoKartJob | IProgPilotJob | IBanditJob;
	repo: IRepo;
}
