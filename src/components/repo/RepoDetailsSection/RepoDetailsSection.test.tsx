import { IRepo } from '@/interfaces/api/IRepo';
import { axe } from 'jest-axe';

import { act, render, screen, waitForElementToBeRemoved } from 'test-utils';
import { RepoDetailsSection } from './';

jest.mock('next/router', () => ({
	useRouter: () => ({
		query: { repoId: '1' },
	}),
}));

describe('RepoDetailsSection', () => {
	describe('when repoId is falsy', () => {
		it('should matches snapshot', () => {
			const { asFragment } = render(<RepoDetailsSection repoId="" />);

			expect(asFragment()).toMatchSnapshot();
		});

		it('should be accessible', async () => {
			const { container } = render(<RepoDetailsSection repoId="" />);

			let results: Awaited<ReturnType<typeof axe>>;
			await act(async () => {
				results = await axe(container);
			});
			expect(results).toHaveNoViolations();
		});
	});

	describe('when repoId exists', () => {
		beforeEach(() => {
			window.fetch = jest.fn().mockImplementation(() => {
				return Promise.resolve({
					ok: true,
					status: 200,
					headers: new Headers({ 'Content-Type': 'application/json', 'Content-Length': '1' }),
					json: () =>
						Promise.resolve({
							id: 1,
							name: 'test',
							description: 'test',
							owner: {
								login: 'test',
								avatar_url: 'test',
								html_url: 'test',
							},
							html_url: 'test',
							language: 'test',
							stargazers_count: 1,
							created_at: 'test',
							privacy: 1,
							security: 2,
						} as Partial<IRepo>),
				});
			});
		});

		it('should matches snapshot', async () => {
			const { asFragment } = render(<RepoDetailsSection repoId="1" />);

			await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

			expect(asFragment()).toMatchSnapshot();
		});

		it('should be accessible', async () => {
			const { container } = render(<RepoDetailsSection repoId="1" />);

			let results: Awaited<ReturnType<typeof axe>>;
			await act(async () => {
				results = await axe(container);
			});
			expect(results).toHaveNoViolations();
		});

		afterEach(() => {
			jest.restoreAllMocks();
		});
	});
});
