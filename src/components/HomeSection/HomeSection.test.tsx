import { axe } from 'jest-axe';

import { act, render } from 'test-utils';
import HomeSection from './HomeSection';

describe('HomeSection', () => {
	it('should matches gdpr snapshot', () => {
		const { asFragment } = render(<HomeSection variant="gdpr" />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible (gdpr)', async () => {
		const { container } = render(<HomeSection variant="gdpr" />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});

		expect(results).toHaveNoViolations();
	});

	it('should matches privacy snapshot', () => {
		const { asFragment } = render(<HomeSection variant="collaboration" />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible (privacy)', async () => {
		const { container } = render(<HomeSection variant="collaboration" />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});

		expect(results).toHaveNoViolations();
	});

	it('should matches terms snapshot', () => {
		const { asFragment } = render(<HomeSection variant="flawDetection" />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible (terms)', async () => {
		const { container } = render(<HomeSection variant="flawDetection" />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});

		expect(results).toHaveNoViolations();
	});
});
