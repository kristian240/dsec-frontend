import themeOverrides from '@/styles/theme';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { appWithTranslation } from 'next-i18next';

const extendedTheme = extendTheme(themeOverrides);

const DSecApp = ({ Component, pageProps }) => (
	<ChakraProvider theme={extendedTheme}>
		<Component {...pageProps} />
	</ChakraProvider>
);

export default appWithTranslation(DSecApp);
