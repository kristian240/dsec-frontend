import { axe } from 'jest-axe';

import { act, render } from 'test-utils';
import { GithubIcon } from './GithubIcon';

describe('GithubIcon', () => {
	it('should matches snapshot', () => {
		const { asFragment } = render(<GithubIcon />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<GithubIcon />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});

		expect(results).toHaveNoViolations();
	});
});
