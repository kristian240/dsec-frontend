import { axe } from 'jest-axe';

import { act, render } from 'test-utils';
import { DashboardRepoList } from './';

const mockRouterPush = jest.fn();
jest.mock('next/router', () => ({ useRouter: jest.fn(() => ({ push: mockRouterPush })) }));

describe('DashboardRepoList', () => {
	it('should matches snapshot', () => {
		const { asFragment } = render(<DashboardRepoList />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<DashboardRepoList />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});

		expect(results).toHaveNoViolations();
	});
});
