export enum CreateProjectSteps {
	ProjectDetails = 'projectDetails',
	GiovanniProject = 'giovanniProject',
	Priorities = 'priorities',
	GitHubIntegration = 'gitHubIntegration',
	Success = 'success',
}

export const steps = [
	CreateProjectSteps.ProjectDetails,
	CreateProjectSteps.GiovanniProject,
	CreateProjectSteps.Priorities,
	CreateProjectSteps.GitHubIntegration,
];
