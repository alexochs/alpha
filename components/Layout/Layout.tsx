import {
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
        <>
            <Topbar isMobile={isMobile} />

            <main>{children}</main>
        </>
    );
}
