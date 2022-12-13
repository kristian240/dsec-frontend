import { IUserRoleDto } from '@/interfaces/api/IUserRoleDto';

export interface IUserDto {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	userRole: IUserRoleDto;
}
