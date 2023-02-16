import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignInPage() {
    const router = useRouter();
    const supabase = useSupabaseClient();

    return (
        <Center h="100vh" w="100vw" flexDir="column">
            <Heading
                fontSize="6xl"
                fontStyle={"italic"}
                letterSpacing={"0.5rem"}
            >
                ACCESS DENIED
            </Heading>
            <Button
                mt="1rem"
                rounded="full"
                onClick={async () => {
                    await supabase.auth.signOut();
                    router.push("/");
                }}
            >
                Sign Out
            </Button>
        </Center>
    );
}
