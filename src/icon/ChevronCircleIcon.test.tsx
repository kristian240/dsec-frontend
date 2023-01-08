import { axe } from 'jest-axe';

import { act, render } from 'test-utils';
import { ChevronCircleIcon } from './ChevronCircleIcon';

describe('ChevronCircleIcon', () => {
	it('should matches snapshot', () => {
		const { asFragment } = render(<ChevronCircleIcon />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<ChevronCircleIcon />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});

		expect(results).toHaveNoViolations();
	});
});
