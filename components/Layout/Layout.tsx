import {
    Box,
    ChakraProvider,
    extendTheme,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { createContext, useState } from "react";
import Head from "next/head";
import Topbar from "./Topbar";
import Navigation from "./Navigation";
import { useRouter } from "next/router";

export default function Layout({ children, pageProps }: any) {
    const isMobile = useMediaQuery("(max-width: 768px)")[0];
    const router = useRouter();

    function showBars() {
        return router.asPath.includes("productivity") || router.asPath.includes("profiles");
    }

    return (
        <Box color="gray.700">
            {showBars() && <Topbar isMobile={isMobile} />}

            <Box bg="gray.100" minH="100vh" pt="2rem">
                <main>{children}</main>
            </Box>

            {showBars() && isMobile && (
                <Navigation isMobile={isMobile} />
            )}
        </Box>
    );
}
