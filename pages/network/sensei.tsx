import { Center, Checkbox, Flex, Heading, Text, SimpleGrid, Input, VStack, HStack, Stack, TableContainer, Table, Tbody, Tr, Td, Button, Thead, Th, Box, useDisclosure, Icon, IconButton, useMediaQuery, useToast, Link } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaPlus, FaPlusCircle, FaQuestionCircle, FaTimesCircle } from "react-icons/fa";
import CreateHabitModal from "../../components/Modals/CreateHabitModal";
import HabitTrackerHelpModal from "../../components/Modals/HabitTrackerHelpModal";
import SenseiHelpModal from "../../components/Modals/SenseiHelpModal";
import TelegramLoginButton from 'react-telegram-login';

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

    const profileId = session.user.id;

    const { data, error } = await supabase
        .from("profiles")
        .select("telegram")
        .eq("id", profileId);

    if (error) {
        console.log(error);
        return;
    }

    const { data: startedData, error: startedError } = await supabase
        .from("started-bot")
        .select("*")
        .eq("telegram", data[0].telegram)
        .single();

    console.log(startedData);

    return {
        props: {
            profileId,
            initialTelegram: data[0].telegram,
            initialStarted: startedData ? startedData.started : false,
        },
    };
}

export default function HabitTrackerPage({ profileId, initialTelegram, initialStarted }: any) {
    const isMobile = useMediaQuery("(max-width: 768px)")[0];
    const supabase = useSupabaseClient();
    const toast = useToast();

    const { isOpen: helpIsOpen, onOpen: helpOnOpen, onClose: helpOnClose } = useDisclosure();

    const [telegram, setTelegram] = useState(initialTelegram);
    const [started, setStarted] = useState(initialStarted);

    async function sendTestMessage() {
        await fetch("/api/tg-sendMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: telegram,
                text: "Hello from Master Yourself!",
            }),
        });
    }

    async function handleTelegramLogin(authRes: any) {
        const res = await supabase
            .from("profiles")
            .upsert({ id: profileId, telegram: authRes.id })
            .eq("id", profileId);

        if (res.status !== 201) {
            toast({
                title: 'Failed to link Telegram',
                description: "Seems like something went wrong, please try again.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: isMobile ? "top" : "bottom"
            })
            console.error(res.error?.message);
            return;
        }

        toast({
            title: 'Telegram linked',
            description: "We've linked your account with Telegram, Sensei awaits you.",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: isMobile ? "top" : "bottom",
        })

        setTelegram(authRes.id);

        await fetch("/api/tg-sendMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: authRes.id,
                text: "Hello from Master Yourself!",
            }),
        });
    }

    return (
        <Center flexDir={"column"}>
            <Stack spacing="2rem">
                <Center>
                    <Text
                        fontSize={["4xl", "5xl"]}
                        fontWeight={"bold"}
                        letterSpacing="0.1rem"
                        textAlign={"center"}
                    >
                        Sensei
                    </Text>
                    <IconButton
                        ml="1rem"
                        aria-label="help"
                        icon={<FaQuestionCircle size="1.5rem" />}
                        onClick={helpOnOpen}
                        rounded="full"
                    />
                </Center>

                <Stack>
                    <Heading>Setup</Heading>

                    <Box mt="1rem">
                        <Flex>
                            <Text fontSize="2xl" fontWeight="bold">
                                1. Link your Telegram
                            </Text>

                            <Center>
                                <Icon as={telegram ? FaCheckCircle : FaTimesCircle} ml=".5rem" color={telegram ? "green.500" : "red.500"} boxSize="2rem" />
                            </Center>
                        </Flex>

                        <Center mt=".5rem">
                            <TelegramLoginButton dataOnauth={handleTelegramLogin} botName="MasterYourselfBot" />
                        </Center>
                    </Box>

                    <Stack mt="2rem">
                        <Flex>
                            <Text fontSize="2xl" fontWeight="bold">
                                2. Start the bot
                            </Text>

                            <Center>
                                <Icon as={started ? FaCheckCircle : FaTimesCircle} ml=".5rem" color={started ? "green.500" : "red.500"} boxSize="2rem" />
                            </Center>
                        </Flex>

                        <Text fontSize="xl">
                            Send <i>/start</i> to @MasterYourselfBot
                        </Text>

                        <Link href={telegram ? "https://t.me/MasterYourselfBot" : ""} target="_blank" style={{ textDecoration: "none" }}>
                            <Button isDisabled={!telegram} w="100%" variant="solid" colorScheme="red" rounded="full">
                                Open chat in Telegram
                            </Button>
                        </Link>
                    </Stack>
                </Stack>

                <Button
                    rounded="full"
                    colorScheme={"red"}
                    variant="solid"
                    onClick={sendTestMessage}
                    isDisabled={!telegram}
                    mt="2rem"
                >
                    Send test message
                </Button>
            </Stack>

            <SenseiHelpModal isOpen={helpIsOpen} onClose={helpOnClose} />
        </Center>
    );
}