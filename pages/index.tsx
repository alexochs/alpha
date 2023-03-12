import { Button, Center, Heading, Image, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function getServerSideProps(context: any) {
    const supabase = createServerSupabaseClient(context);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        return {
            redirect: {
                destination: "/productivity/daily-tasks",
                permanent: false,
            },
        };
    } else {
        return {
            props: {},
        };
    }
}

export default function HomePage() {
    return (
        <Center h="95vh" flexDir="column" color="gray.700">
            <Stack spacing="1rem">
                <Heading
                    fontSize={["5xl", "9xl"]}
                    letterSpacing={"0.5rem"}
                    fontStyle="italic"
                    textAlign={"center"}
                >
                    MASTER YOURSELF
                </Heading>

                <Center>
                    <Text
                        fontSize={["xl", "4xl"]}
                        border="2px"
                        px="1rem"
                        rounded="full"
                        color="yellow.400"
                    >
                        B E T A
                    </Text>
                </Center>

                <Center>
                    <Link href="/productivity/daily-tasks">
                        <Button
                            colorScheme="yellow"
                            mt="2rem"
                            p="2rem"
                            letterSpacing={"0.1rem"}
                            rounded="full"
                            color="gray.700"
                        >
                            <Text fontSize={["2xl", "4xl"]}>
                                START YOUR JOURNEY
                            </Text>
                        </Button>
                    </Link>
                </Center>
            </Stack>
        </Center>
    );
}
