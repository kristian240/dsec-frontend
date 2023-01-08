import { axe } from 'jest-axe';

import { act, render } from 'test-utils';
import { AddAnalysis } from './';

describe('AddAnalysis', () => {
	it('should matches snapshot', () => {
		const { asFragment } = render(<AddAnalysis />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<AddAnalysis />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});

		expect(results).toHaveNoViolations();
	});
});
