import { useUser } from '@/hooks/useUser';
import { IUserDto } from '@/interfaces/api/IUserDto';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

interface IAuthRedirectProps {
	to: string;
	ifFound?: boolean;
	condition?(currentUser: IUserDto): boolean;
}

export const AuthRedirect: FC<IAuthRedirectProps> = ({ condition, ifFound, to }) => {
	const { data, error, isValidating } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (isValidating) {
			return;
		}

		const notInitialized = data === undefined && error === undefined;
		if (notInitialized) {
			return;
		}

		if (condition) {
			if (condition(data)) {
				router.push(to);
			}

			return;
		}

		const shouldRedirect = (ifFound && data) || (!ifFound && !data);

		if (shouldRedirect) {
			router.push(to);
		}
	}, [condition, data, error, ifFound, isValidating, router, to]);

	return null;
};
