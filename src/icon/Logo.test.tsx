import { axe } from 'jest-axe';

import { act, render } from 'test-utils';
import { LogoSvg } from './Logo';

describe('Logo', () => {
	it('should matches snapshot', () => {
		const { asFragment } = render(<LogoSvg />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<LogoSvg />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});

		expect(results).toHaveNoViolations();
	});
});
