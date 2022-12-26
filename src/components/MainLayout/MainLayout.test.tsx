import React from 'react';
import { axe } from 'jest-axe';

import { MainLayout } from './MainLayout';
import { act, render, screen } from 'test-utils';

describe('MainLayout', () => {
	it('should matches snapshot', () => {
		const { asFragment } = render(<MainLayout />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<MainLayout />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});
		expect(results).toHaveNoViolations();
	});

	it('should render navigation', async () => {
		const navigationContent = 'navigation';
		render(<MainLayout navigation={<nav>{navigationContent}</nav>} />);

		expect(screen.getByRole('navigation')).toBeDefined();
	});

	it('should render children', async () => {
		const children = 'children';
		render(
			<MainLayout>
				<div>{children}</div>
			</MainLayout>
		);

		expect(screen.getByText(children)).toBeDefined();
	});
});
