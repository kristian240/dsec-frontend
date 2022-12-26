import { axe } from 'jest-axe';
import { useRouter } from 'next/router';

import { act, render } from 'test-utils';
import AuthHeader from './';

jest.mock('next/router', () => ({ useRouter: jest.fn(() => ({ pathname: '/' })) }));

describe('AuthHeader', () => {
	it('should matches snapshot', () => {
		const { asFragment } = render(<AuthHeader />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<AuthHeader />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});

		expect(results).toHaveNoViolations();
	});

	it('should be highlight current page', async () => {
		(useRouter as jest.Mock).mockReturnValue({ pathname: '/login' });
		const { asFragment } = render(<AuthHeader />);

		expect(asFragment()).toMatchSnapshot();
	});
});
