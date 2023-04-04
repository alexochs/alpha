import type { AppProps } from "next/app";
import { ChakraProvider, createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { checkboxAnatomy } from '@chakra-ui/anatomy'

import "@fontsource/space-grotesk/700.css";
import "@fontsource/space-grotesk/400.css";
import Head from "next/head";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Layout from "../components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
    const [supabaseClient] = useState(() => createBrowserSupabaseClient());

    const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
        checkboxAnatomy.keys,
    )

    const sizes = {
        xl: definePartsStyle({
            control: defineStyle({
                boxSize: "4rem",
                fontSize: "2rem",
                borderRadius: "1rem",
                bg: "gray.300"
            }),
        }),
        mobilexl: definePartsStyle({
            control: defineStyle({
                boxSize: "3.5rem",
                fontSize: "1.75rem",
                borderRadius: ".75rem",
                bg: "gray.300"
            }),
        }),
    }

    const checkboxTheme = defineMultiStyleConfig({ sizes });

    const theme = extendTheme({
        fonts: {
            heading: `'Space Grotesk', sans-serif`,
            body: `'Space Grotesk', sans-serif`,
        },
        components: {
            Checkbox: checkboxTheme,
        },
    });

    return (
        <ChakraProvider theme={theme}>
            <SessionContextProvider
                supabaseClient={supabaseClient}
                initialSession={pageProps.initialSession}
            >
                <Head>
                    <title>Master Yourself</title>
                    <link rel="favicon" href="/favicon.ico" />
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                </Head>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionContextProvider>
        </ChakraProvider>
    );
}
