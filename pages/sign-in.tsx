import { Box, Text, Center, Heading } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignInPage() {
    const router = useRouter();
    const supabase = useSupabaseClient();
    const user = useUser();

    useEffect(() => {
        if (user) {
            router.push("/productivity/daily-tasks");
        }
    }, [user]);

    return (
        <Center h="100vh" w="100vw" flexDir="column">
            <Heading
                fontSize="6xl"
                fontStyle={"italic"}
                letterSpacing={"0.5rem"}
            >
                SIGN IN
            </Heading>

            <Box py="2rem" />

            <Text fontSize="xl">Please check your spam!</Text>

            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
            //providers={["google"]}
            />
        </Center>
    );
}
