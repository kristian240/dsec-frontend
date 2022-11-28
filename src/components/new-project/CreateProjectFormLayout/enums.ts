export enum CreateProjectSteps {
	ProjectDetails = 'projectDetails',
	NewAnalysis = 'newAnalysis',
	Priorities = 'priorities',
	GitHubIntegration = 'gitHubIntegration',
	Success = 'success',
}

export const steps = [
	CreateProjectSteps.ProjectDetails,
	CreateProjectSteps.NewAnalysis,
	CreateProjectSteps.Priorities,
	CreateProjectSteps.GitHubIntegration,
];
