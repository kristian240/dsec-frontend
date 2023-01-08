import { Topics } from '@/components/wiki/Topic';
import { axe } from 'jest-axe';

import { act, render } from 'test-utils';
import ReadMore from './';

const mockRouterPush = jest.fn();
jest.mock('next/router', () => ({ useRouter: jest.fn(() => ({ push: mockRouterPush })) }));

describe('ReadMore', () => {
	it('should matches snapshot', () => {
		const { asFragment } = render(<ReadMore activeTopic={Topics.Design} />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<ReadMore activeTopic={Topics.Design} />);

		let results: Awaited<ReturnType<typeof axe>>;
		await act(async () => {
			results = await axe(container);
		});

		expect(results).toHaveNoViolations();
	});
});
