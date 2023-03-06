import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export async function getServerSideProps(context: any) {
    const supabase = createServerSupabaseClient(context);
    const profileId = context.params.profileId;

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return {
            redirect: {
                destination: "/sign-in",
                permanent: false,
            },
        };
    }

    /*const allowList = ["mail@alexochs.de", "maltestarck02@gmail.com"];
    if (!allowList.includes(session.user.email!)) {
        return {
            redirect: {
                destination: "/access-denied",
                permanent: false,
            },
        };
    }*/

    return {
        props: {
            initialSession: session,
            user: session.user,
            isCurrentUser: session.user.id === profileId,
        },
    };
}

export default function ProfilePage({
    initialSession,
    user,
    isCurrentUser,
}: any) {
    const router = useRouter();
    const supabase = useSupabaseClient();

    return (
        <Center w="100vw" h="90vh">
            <VStack spacing="4rem">
                <Heading>{user.email}</Heading>

                {isCurrentUser && (
                    <Text px="1rem">
                        You are currently viewing your own profile.
                    </Text>
                )}

                <Button
                    onClick={async () => {
                        router.push("/productivity/daily-tasks");
                    }}
                    rounded="full"
                    maxW="10vw"
                >
                    Back to App
                </Button>

                <Button
                    onClick={async () => {
                        await supabase.auth.signOut();
                        router.push("/");
                    }}
                    size="sm"
                    fontWeight={"normal"}
                    fontSize="xs"
                    rounded="full"
                    colorScheme={"red"}
                    variant="ghost"
                    maxW="10vw"
                >
                    Sign Out
                </Button>
            </VStack>
        </Center>
    );
}
