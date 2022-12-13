import { useUser } from '@/hooks/useUser';
import { IRepo } from '@/interfaces/api/IRepo';
import useSWR from 'swr';

export const useUserRepos = () => {
	const { data: user } = useUser();

	return useSWR<Array<IRepo>>(() => (user.id ? `/api/users/${user.id}/repos` : null));
};
