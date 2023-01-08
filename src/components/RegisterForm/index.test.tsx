import { axe } from 'jest-axe';

import RegisterForm from './';
import { act, render, screen } from 'test-utils';

const mockRouterPush = jest.fn();
jest.mock('next/router', () => ({ useRouter: jest.fn(() => ({ push: mockRouterPush })) }));

describe('RegisterForm', () => {
	it('should matches snapshot', () => {
		const { asFragment } = render(<RegisterForm />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<RegisterForm />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});

		expect(results).toHaveNoViolations();
	});
});
