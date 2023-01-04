import type { IRepo } from '@/interfaces/api/IRepo';

export interface IGitLeaksJob {
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

export interface IGoKartJob {
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

export interface IProgPilotJob extends IGoKartJob {}

export interface IBanditJob {
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

/**
 * @schema https://schemastore.azurewebsites.net/schemas/json/sarif-2.1.0-rtm.5.json
 */
export interface IFlawFinderJob {
	runs: Array<{
		results: Array<{
			message: {
				text: string;
			};
			locations: Array<{
				physicalLocation: {
					artifactLocation: {
						uri: string;
					};
					region: {
						endLine?: number;
						startLine: number;
					};
				};
			}>;
		}>;
	}>;
}

type ToolReturn =
	| {
			tool: { toolName: 'GITLEAKS' };
			log: IGitLeaksJob;
	  }
	| {
			tool: { toolName: 'GOKART' };
			log: IGoKartJob;
	  }
	| {
			tool: { toolName: 'PROGPILOT' };
			log: IProgPilotJob;
	  }
	| {
			tool: { toolName: 'FLAWFINDER' };
			log: IFlawFinderJob;
	  }
	| {
			tool: { toolName: 'BANDIT' };
			log: IBanditJob;
	  };

export type IJob = ToolReturn & {
	id: number;
	startTime: string;
	endTime?: string;
	compliant: boolean;
	repo: IRepo;
};
