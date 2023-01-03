export enum CreateRepositorySteps {
	NewRepository = 'newRepository',
	RepositoryDetails = 'repositoryDetails',
	Priorities = 'priorities',
	Success = 'success',
}

export const steps = [
	CreateRepositorySteps.NewRepository,
	CreateRepositorySteps.RepositoryDetails,
	CreateRepositorySteps.Priorities,
];
