import { post } from '@/utils/network';

export enum RepoFields {
	REPO = 'repo-select',
	NAME = 'repo-name',
	DESCRIPTION = 'repo-description',
	TYPE = 'repo-type',
	DOMAIN = 'repo-domain',
	USER_DATA = 'repo-user-data',
	SECURITY = 'repo-security',
	PRIVACY = 'repo-privacy',
	LANGUAGE = 'repo-language',
}

export type RepoFormValues = Record<RepoFields, unknown>;

export async function createRepo(formData: RepoFormValues) {
	const language = (formData[RepoFields.LANGUAGE] as string).toUpperCase();
	const requestBody = {
		repoName: formData[RepoFields.NAME],
		description: formData[RepoFields.DESCRIPTION],
		type: (formData[RepoFields.TYPE] as string).toUpperCase(),
		domain: (formData[RepoFields.DOMAIN] as string).toUpperCase().replace('-', ''),
		userData: parseInt(formData[RepoFields.USER_DATA] as string, 10) > 0,
		security: formData[RepoFields.SECURITY],
		privacy: formData[RepoFields.PRIVACY],
		language: language == 'OTHER' ? 'NONE' : language == 'C/C++' ? 'C_CPP' : language,
	};

	return post(`/api/repo/${formData[RepoFields.REPO]}`, requestBody);
}
