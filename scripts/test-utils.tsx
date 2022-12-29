import { get } from '@/utils/network';
import '@testing-library/jest-dom';
import { act, render, RenderOptions } from '@testing-library/react';
import i18n from 'i18next';
import { FC, ReactElement, ReactNode } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { SWRConfig } from 'swr';

import common from '../public/locales/en/common.json';

i18n.use(initReactI18next).init({
	lng: 'en',
	fallbackLng: 'en',
	ns: ['common'],
	defaultNS: 'common',
	resources: { en: { common } },
});

interface IComponentWithChildrenProps {
	children?: ReactNode;
}

const AllTheProviders: FC<IComponentWithChildrenProps> = ({ children }) => (
	<I18nextProvider i18n={i18n}>
		<SWRConfig value={{ provider: () => new Map(), fetcher: get }}>{children}</SWRConfig>
	</I18nextProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
	render(ui, { wrapper: AllTheProviders, ...options });

// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
const customAct: typeof act = (cb) => {
	let prev = global.IS_REACT_ACT_ENVIRONMENT;
	global.IS_REACT_ACT_ENVIRONMENT = true;

	const result = act(cb);

	global.IS_REACT_ACT_ENVIRONMENT = prev;

	return result;
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render, customAct as act };
