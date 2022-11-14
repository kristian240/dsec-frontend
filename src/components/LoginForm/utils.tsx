import { post } from '@/utils/network';

export enum LoginFields {
	EMAIL = 'login-email',
	PASSWORD = 'login-password',
}

export type LoginFormValues = Record<LoginFields, unknown>;

export function loginUser(formData: LoginFormValues) {
	const requestBody = {
		email: formData[LoginFields.EMAIL],
		password: formData[LoginFields.PASSWORD],
	};

	return post('/api/auth/login', requestBody);
}
