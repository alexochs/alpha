import {
    Box,
    Center,
    ChakraProvider,
    extendTheme,
    Icon,
    IconButton,
    Link,
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
import { FaPlus, FaQuestion } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";

export default function Layout({ children, pageProps }: any) {
    const isMobile = useMediaQuery("(max-width: 768px)")[0];
    const router = useRouter();

    function showBars() {
        return router.asPath.includes("productivity") ||
            router.asPath.includes("network") ||
            router.asPath.includes("profiles") ||
            router.asPath.includes("faq");
    }

    return (
        <Box color="gray.700">
            {showBars() && <Topbar isMobile={isMobile} />}

            <Box bg="gray.100" minH="100vh" pt="2rem">
                <Link zIndex={3} href="https://forms.gle/UDpoVAaqpfBFxv8y5" target="_blank">
                    <Center aria-label="help"
                        w={["3rem", "4rem"]}
                        h={["3rem", "4rem"]}
                        bg="gray.200"
                        _hover={{ bg: "gray.300" }}
                        rounded="full"
                        position="fixed"
                        bottom={["5rem", "2rem"]}
                        left={["1rem", "2rem"]}>
                        <Icon as={MdFeedback} color="#666666" w={["1.5rem", "2rem"]} h={["1.5rem", "2rem"]} />
                    </Center>
                </Link>
                <main>{children}</main>
            </Box>

            {showBars() && isMobile && (
                <Navigation isMobile={isMobile} />
            )}
        </Box>
    );
}
