import themeOverrides from '@/styles/theme';
import { get } from '@/utils/network';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { appWithTranslation } from 'next-i18next';
import { SWRConfig } from 'swr';
import '../../public/fonts/fonts.css';

const extendedTheme = extendTheme(themeOverrides);

const DSecApp = ({ Component, pageProps }) => (
	<ChakraProvider theme={extendedTheme}>
		<SWRConfig value={{ fetcher: get }}>
			<Component {...pageProps} />
		</SWRConfig>
	</ChakraProvider>
);

export default appWithTranslation(DSecApp);
