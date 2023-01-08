import { axe } from 'jest-axe';

import { act, render, screen, waitForElementToBeRemoved } from 'test-utils';
import { ConfirmButton } from './ConfirmButton';

const mockRouterPush = jest.fn();
jest.mock('next/router', () => ({ useRouter: jest.fn(() => ({ push: mockRouterPush })) }));

describe('ConfirmButton', () => {
	const props: Parameters<typeof ConfirmButton>[0] = {
		bodyText: 'bodyText',
		buttonText: 'buttonText',
		headerText: 'headerText',
		isDanger: false,
		onSuccessAction: jest.fn(),
		redirectLink: 'redirectLink',
		closeButtonText: 'closeButtonText',
	};

	it('should matches snapshot', () => {
		const { asFragment } = render(<ConfirmButton {...props} />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<ConfirmButton {...props} />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});

		expect(results).toHaveNoViolations();
	});

	it('should open modal on button click ', async () => {
		render(<ConfirmButton {...props} />);

		const button = screen.getByRole('button', { name: props.buttonText });
		expect(button).toBeInTheDocument();

		expect(screen.queryByRole('dialog')).toBeFalsy();
		await act(async () => {
			button.click();
		});

		expect(await screen.findByRole('dialog')).toBeTruthy();
	});

	it("should close modal on 'Close' button click", async () => {
		render(<ConfirmButton {...props} />);

		const button = screen.getByRole('button', { name: props.buttonText });
		expect(button).toBeInTheDocument();

		await act(async () => {
			button.click();
		});

		const closeButton = screen.getByRole('button', { name: props.closeButtonText });
		expect(closeButton).toBeInTheDocument();

		await act(async () => {
			closeButton.click();
		});

		await waitForElementToBeRemoved(screen.queryByRole('dialog'));
		expect(screen.queryByRole('dialog')).toBeFalsy();
	});

	it('should call onSuccessAction and redirect on submit', async () => {
		render(<ConfirmButton {...props} />);

		const button = screen.getByRole('button', { name: props.buttonText });
		expect(button).toBeInTheDocument();

		await act(async () => {
			button.click();
		});

		const submitButton = screen.getByRole('button', { name: props.buttonText });
		expect(submitButton).toBeInTheDocument();

		await act(async () => {
			submitButton.click();
		});

		expect(props.onSuccessAction).toBeCalledTimes(1);
		expect(mockRouterPush).toBeCalledTimes(1);
		expect(mockRouterPush).toBeCalledWith(props.redirectLink);
	});
});
