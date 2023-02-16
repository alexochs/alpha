import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import "@fontsource/space-grotesk/700.css";
import "@fontsource/space-grotesk/400.css";
import Head from "next/head";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const theme = extendTheme({
    fonts: {
      heading: `'Space Grotesk', sans-serif`,
      body: `'Space Grotesk', sans-serif`,
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        {" "}
        <Head>
          <title>Master Yourself</title>
          <link rel="favicon" href="/public/logo.png" />
        </Head>
        <Component {...pageProps} />
      </SessionContextProvider>
    </ChakraProvider>
  );
}
