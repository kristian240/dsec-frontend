import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { act, render, screen, waitFor } from 'test-utils';
import LoginForm from './';

const mockPost = jest.fn();
jest.mock('@/utils/network', () => ({ post: (...args) => mockPost(...args) }));

const mockRouterPush = jest.fn();
jest.mock('next/router', () => ({ useRouter: jest.fn(() => ({ push: mockRouterPush })) }));

describe('LoginForm', () => {
	it('should matches snapshot', () => {
		const { asFragment } = render(<LoginForm />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<LoginForm />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});

		expect(results).toHaveNoViolations();
	});

	it('should create an api call on submit', async () => {
		mockPost.mockResolvedValue({});
		const user = userEvent.setup();
		render(<LoginForm />);

		const submitButton = screen.getByRole('button', { name: 'Login' });
		expect(submitButton).toBeInTheDocument();

		await user.type(screen.getByPlaceholderText('Email'), 'mail@mail.com');
		await user.type(screen.getByPlaceholderText('Password'), 'password');

		await act(async () => {
			await user.click(submitButton);
		});

		waitFor(() => expect(mockPost).toHaveBeenCalled());
	});

	it('should create an api call on submit (reject)', async () => {
		mockPost.mockRejectedValue({});
		const user = userEvent.setup();
		render(<LoginForm />);

		const submitButton = screen.getByRole('button', { name: 'Login' });
		expect(submitButton).toBeInTheDocument();

		await user.type(screen.getByPlaceholderText('Email'), 'mail@mail.com');
		await user.type(screen.getByPlaceholderText('Password'), 'password');

		await act(async () => {
			await user.click(submitButton);
		});

		waitFor(() => expect(mockPost).toHaveBeenCalled());
	});

	afterAll(() => {
		jest.clearAllMocks();
	});
});
