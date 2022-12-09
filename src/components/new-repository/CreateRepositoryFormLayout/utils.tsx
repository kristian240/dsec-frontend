import { get, post } from '@/utils/network';

export enum RepoFields {
	REPO = 'repo-select',
	NAME = 'repo-name',
	DESCRIPTION = 'repo-description',
	TYPE = 'repo-type',
	DOMAIN = 'repo-domain',
	USER_DATA = 'repo-user-data',
	PRIORITIZATION = 'repo-prioritization',
}

export type RepoFormValues = Record<RepoFields, unknown>;

export async function createRepo(formData: RepoFormValues) {
	const requestBody = {
		repo: formData[RepoFields.REPO],
		name: formData[RepoFields.NAME],
		description: formData[RepoFields.DESCRIPTION],
		type: formData[RepoFields.TYPE],
		domain: formData[RepoFields.DOMAIN],
		userdata: formData[RepoFields.USER_DATA],
		prioritization: formData[RepoFields.PRIORITIZATION],
	};
	let user = '';
	await get('/api/github/user').then((resp) => {
		user = resp.login;
		return post(`/api/repo/${user}/${requestBody.repo}`);
	});
}
