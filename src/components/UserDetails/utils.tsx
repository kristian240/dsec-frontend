import { update } from '@/utils/network';

export enum UserDetailsFormFields {
	EMAIL = 'user-details-email',
	FIRST_NAME = 'user-details-first-name',
	LAST_NAME = 'user-details-last-name',
	PASSWORD = 'user-details-password',
}

export type UserDetailsFormValues = Record<UserDetailsFormFields, unknown>;

export function updateUserData(id: number, formData: UserDetailsFormValues) {
	const requestBody = {
		firstName: formData[UserDetailsFormFields.FIRST_NAME],
		lastName: formData[UserDetailsFormFields.LAST_NAME],
		email: formData[UserDetailsFormFields.EMAIL],
	};

	return update(`/api/users/${id}`, requestBody);
}
