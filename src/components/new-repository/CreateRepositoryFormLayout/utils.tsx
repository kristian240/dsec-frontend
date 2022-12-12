import { post } from '@/utils/network';

export enum RepoFields {
	REPO = 'repo-select',
	NAME = 'repo-name',
	DESCRIPTION = 'repo-description',
	TYPE = 'repo-type',
	DOMAIN = 'repo-domain',
	USER_DATA = 'repo-user-data',
	AVAILABILITY = 'repo-availability',
	SECURITY = 'repo-security',
}

export type RepoFormValues = Record<RepoFields, unknown>;

export async function createRepo(formData: RepoFormValues) {
	const requestBody = {
		repoName: formData[RepoFields.NAME],
		description: formData[RepoFields.DESCRIPTION],
		type: (formData[RepoFields.TYPE] as string).toUpperCase(),
		domain: (formData[RepoFields.DOMAIN] as string).toUpperCase(),
		userData: parseInt(formData[RepoFields.USER_DATA] as string, 10) > 0,
		security: formData[RepoFields.SECURITY],
		availability: formData[RepoFields.AVAILABILITY],
	};

	return post(`/api/repo/${formData[RepoFields.REPO]}`, requestBody);
}
