import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/router';

import { render } from 'test-utils';
import { AuthRedirect } from './AuthRedirect';

jest.mock('@/hooks/useUser', () => ({ useUser: jest.fn(() => ({})) }));
jest.mock('next/router', () => ({ useRouter: jest.fn(() => ({})) }));

describe('AuthRedirect', () => {
	let push: jest.Func;

	beforeEach(() => {
		push = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({ push });
	});

	it('should do nothing if user not loaded', () => {
		(useUser as jest.Mock).mockReturnValue({ data: undefined, error: undefined, isValidating: true });
		render(<AuthRedirect to="/" />);

		expect(push).not.toBeCalled();
	});

	it('should do nothing if user exists', () => {
		(useUser as jest.Mock).mockReturnValue({ data: {}, error: undefined, isValidating: false });
		render(<AuthRedirect to="/" />);

		expect(push).not.toBeCalled();
	});

	it('should do nothing if user not exists and ifFound set', () => {
		(useUser as jest.Mock).mockReturnValue({ data: undefined, error: {}, isValidating: false });
		render(<AuthRedirect to="/" ifFound />);

		expect(push).not.toBeCalled();
	});

	it('should do call push if user exists', async () => {
		(useUser as jest.Mock).mockReturnValue({ data: undefined, error: {}, isValidating: false });

		render(<AuthRedirect to="/" />);

		expect(push).toBeCalled();
	});

	it('should do call push if user exists and ifFound set', async () => {
		(useUser as jest.Mock).mockReturnValue({ data: {}, error: undefined, isValidating: false });

		render(<AuthRedirect to="/" ifFound />);

		expect(push).toBeCalled();
	});

	afterAll(() => {
		jest.resetAllMocks();
	});
});
