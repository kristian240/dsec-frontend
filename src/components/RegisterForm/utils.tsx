import { post } from '@/utils/network';

export enum RegisterFields {
	EMAIL = 'register-email',
	FIRST_NAME = 'register-firstname',
	LAST_NAME = 'register-lastname',
	PASSWORD = 'register-password',
	PASSWORD_REPEAT = 'register-passwordrepeat',
}

export type RegisterFormValues = Record<RegisterFields, unknown>;

export function registerUser(formData: RegisterFormValues) {
	const requestBody = {
		firstName: formData[RegisterFields.FIRST_NAME],
		lastName: formData[RegisterFields.LAST_NAME],
		email: formData[RegisterFields.EMAIL],
		password: formData[RegisterFields.PASSWORD],
		secondPassword: formData[RegisterFields.PASSWORD_REPEAT],
	};

	if (requestBody.password !== requestBody.secondPassword) {
		throw new Error('Passwords do not match!');
	}

	return post('/api/auth/register', requestBody);
}
