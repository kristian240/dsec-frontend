export enum CreateProjectSteps {
	NewRepository = 'newRepository',
	ProjectDetails = 'projectDetails',
	Priorities = 'priorities',
	GitHubIntegration = 'gitHubIntegration',
	Success = 'success',
}

export const steps = [
	CreateProjectSteps.NewRepository,
	CreateProjectSteps.ProjectDetails,
	CreateProjectSteps.Priorities,
	CreateProjectSteps.GitHubIntegration,
];
