import {
    Box,
    ChakraProvider,
    extendTheme,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Head from "next/head";
import Topbar from "./Topbar";

export default function Layout({ children, pageProps }: any) {
    const isMobile = useMediaQuery("(max-width: 768px)")[0];

    return (
        <Box color="gray.700">
            <Topbar isMobile={isMobile} />
            <Box bg="gray.100" minH="100vh" pt="2rem">
                <main>{children}</main>
            </Box>
        </Box>
    );
}
