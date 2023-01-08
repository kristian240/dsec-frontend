import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { act, render, screen, waitFor } from 'test-utils';
import RegisterForm from './';

const mockPost = jest.fn();
jest.mock('@/utils/network', () => ({ post: (...args) => mockPost(...args) }));

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

	it('should create an api call on submit (reject)', async () => {
		mockPost.mockResolvedValue({});
		const user = userEvent.setup();
		render(<RegisterForm />);

		const submitButton = screen.getByRole('button', { name: 'Sign up' });
		expect(submitButton).toBeInTheDocument();

		await user.type(screen.getByPlaceholderText('Email'), 'mail@mail.com');
		await user.type(screen.getByPlaceholderText('First name'), 'first name');
		await user.type(screen.getByPlaceholderText('Last name'), 'last name');
		await user.type(screen.getByPlaceholderText('Password'), 'Password123*');
		await user.type(screen.getByPlaceholderText('Repeat password'), 'Password123*');

		await act(async () => {
			await user.click(submitButton);
		});

		waitFor(() => expect(mockPost).toHaveBeenCalled());
	});

	it('should create an api call on submit (reject)', async () => {
		mockPost.mockRejectedValue({});
		const user = userEvent.setup();
		render(<RegisterForm />);

		const submitButton = screen.getByRole('button', { name: 'Sign up' });
		expect(submitButton).toBeInTheDocument();

		await user.type(screen.getByPlaceholderText('Email'), 'mail@mail.com');
		await user.type(screen.getByPlaceholderText('First name'), 'first name');
		await user.type(screen.getByPlaceholderText('Last name'), 'last name');
		await user.type(screen.getByPlaceholderText('Password'), 'Password123*');
		await user.type(screen.getByPlaceholderText('Repeat password'), 'Password123*');

		await act(async () => {
			await user.click(submitButton);
		});

		waitFor(() => expect(mockPost).toHaveBeenCalled());
	});

	it('should create an api call on submit (reject with fieldErrors)', async () => {
		mockPost.mockRejectedValue({ fieldErrors: [{ fieldValue: 'string', message: 'string' }] });
		const user = userEvent.setup();
		render(<RegisterForm />);

		const submitButton = screen.getByRole('button', { name: 'Sign up' });
		expect(submitButton).toBeInTheDocument();

		await user.type(screen.getByPlaceholderText('Email'), 'mail@mail.com');
		await user.type(screen.getByPlaceholderText('First name'), 'first name');
		await user.type(screen.getByPlaceholderText('Last name'), 'last name');
		await user.type(screen.getByPlaceholderText('Password'), 'Password123*');
		await user.type(screen.getByPlaceholderText('Repeat password'), 'Password123*');

		await act(async () => {
			await user.click(submitButton);
		});

		waitFor(() => expect(mockPost).toHaveBeenCalled());
	});
});
