import { axe } from 'jest-axe';

import { act, render } from 'test-utils';
import { ChevronIcon } from './ChevronIcon';

describe('ChevronIcon', () => {
	it('should matches snapshot', () => {
		const { asFragment } = render(<ChevronIcon />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<ChevronIcon />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});

		expect(results).toHaveNoViolations();
	});
});
