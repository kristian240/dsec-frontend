import { IUserDto } from '@/interfaces/api/IUserDto';
import useSWR from 'swr';

export const useUser = () => {
	return useSWR<IUserDto>('/api/users/me');
};
