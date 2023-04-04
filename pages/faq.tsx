import { Button, Center, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export async function getServerSideProps(context: any) {
    const supabase = createServerSupabaseClient(context);

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

    return {
        props: {
        },
    };
}

export default function FAQPage({ }: any) {
    const router = useRouter();
    const supabase = useSupabaseClient();

    return (
        <Center w="100vw" h="80vh" flexDir={"column"}>
            <Heading textAlign={"center"} fontSize="6xl">Contact</Heading>
            <Link href="mailto:mail@alexochs.de">
                <Text pt="1rem" fontSize="2xl">mail@alexochs.de</Text>
            </Link>
        </Center>
    );
}
