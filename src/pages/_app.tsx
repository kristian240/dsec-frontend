import { ChakraProvider } from '@chakra-ui/react';
import { appWithTranslation } from 'next-i18next';

const DSecApp = ({ Component, pageProps }) => (
	<ChakraProvider>
		<Component {...pageProps} />
	</ChakraProvider>
);

export default appWithTranslation(DSecApp);
