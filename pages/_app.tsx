import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react'
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'

import '@fontsource/space-grotesk/700.css';
import '@fontsource/space-grotesk/400.css';

export default function App({ Component, pageProps }: AppProps) {
  const client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
  });

  const theme = extendTheme({
    fonts: {
      heading: `'Space Grotesk', sans-serif`,
      body: `'Space Grotesk', sans-serif`,
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </ChakraProvider>
  );
}
