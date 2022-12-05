export enum CreateProjectSteps {
	NewRepository = 'newRepository',
	ProjectDetails = 'projectDetails',
	Priorities = 'priorities',
	AddTeam = 'addTeam',
	Success = 'success',
}

export const steps = [
	CreateProjectSteps.NewRepository,
	CreateProjectSteps.ProjectDetails,
	CreateProjectSteps.Priorities,
	CreateProjectSteps.AddTeam,
];
