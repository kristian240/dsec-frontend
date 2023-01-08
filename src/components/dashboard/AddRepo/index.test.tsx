import { axe } from 'jest-axe';

import { act, render } from 'test-utils';
import { AddRepo } from './';

describe('AddRepo', () => {
	it('should matches snapshot', () => {
		const { asFragment } = render(<AddRepo />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<AddRepo />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});

		expect(results).toHaveNoViolations();
	});
});
