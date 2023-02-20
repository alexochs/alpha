import { Box, Text, Button, Center, Heading, Link } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignInPage() {
    const router = useRouter();
    const supabase = useSupabaseClient();

    return (
        <Center h="100vh" flexDir="column">
            <Heading
                textAlign={"center"}
                fontSize="6xl"
                fontStyle={"italic"}
                letterSpacing={"0.5rem"}
            >
                ACCESS DENIED
            </Heading>

            <Link
                href="https://buy.stripe.com/cN27vv5Kl85b6TmfYY"
                target={"_blank"}
                pt="2rem"
            >
                <Button
                    size="lg"
                    letterSpacing={"0.1rem"}
                    rounded="full"
                    variant="solid"
                    colorScheme={"yellow"}
                >
                    <Text fontSize="2xl">BECOME A MEMBER</Text>
                </Button>
            </Link>

            <Button
                colorScheme={"red"}
                variant="ghost"
                mt="6rem"
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
