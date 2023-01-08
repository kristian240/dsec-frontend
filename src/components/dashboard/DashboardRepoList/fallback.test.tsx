import { axe } from 'jest-axe';

import { act, render } from 'test-utils';
import { DashboardRepoListFallback, DashboardRepoListItemFallback } from './fallback';

const mockRouterPush = jest.fn();
jest.mock('next/router', () => ({ useRouter: jest.fn(() => ({ push: mockRouterPush })) }));

describe('DashboardRepoListFallback', () => {
	it('should matches snapshot', () => {
		const { asFragment } = render(<DashboardRepoListFallback />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should matches snapshot DashboardRepoListItemFallback', () => {
		const { asFragment } = render(<DashboardRepoListItemFallback />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<DashboardRepoListFallback />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});

		expect(results).toHaveNoViolations();
	});
});
