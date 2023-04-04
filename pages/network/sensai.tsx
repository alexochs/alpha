import { Center, Checkbox, Flex, Heading, Text, SimpleGrid, Input, VStack, HStack, Stack, TableContainer, Table, Tbody, Tr, Td, Button, Thead, Th, Box, useDisclosure, Icon, IconButton, useMediaQuery, useToast, Link, Select } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaPlus, FaPlusCircle, FaQuestionCircle, FaTimesCircle } from "react-icons/fa";
import CreateHabitModal from "../../components/Modals/CreateHabitModal";
import HabitTrackerHelpModal from "../../components/Modals/HabitTrackerHelpModal";
import SenseiHelpModal from "../../components/Modals/SenseiHelpModal";
import TelegramLoginButton from 'react-telegram-login';
import { BsFillChatDotsFill, BsFillChatFill } from "react-icons/bs";

export async function getServerSideProps(context: any) {
    const supabase = createServerSupabaseClient(context);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return {
            yellowirect: {
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

    const { data: botData, error: botError } = await supabase
        .from("bot")
        .select("*")
        .eq("telegram", data[0].telegram)
        .single();

    return {
        props: {
            profileId,
            botId: botData ? botData.id : null,
            initialTelegram: data[0].telegram,
            initialStarted: botData ? botData.started : false,
            initialTaskNotification: botData && botData.task_notification ? botData.task_notification : "6",
        },
    };
}

export default function SensaiPage({ profileId, botId, initialTelegram, initialStarted, initialTaskNotification }: any) {
    const isMobile = useMediaQuery("(max-width: 768px)")[0];
    const supabase = useSupabaseClient();
    const toast = useToast();

    const { isOpen: helpIsOpen, onOpen: helpOnOpen, onClose: helpOnClose } = useDisclosure();

    const [telegram, setTelegram] = useState(initialTelegram);
    const [started, setStarted] = useState(initialStarted);
    const [taskNotification, setTaskNotification] = useState(
        new Date(new Date().setHours(parseInt(initialTaskNotification) - new Date().getTimezoneOffset() / 60)).getHours()
    );

    async function handleTelegramLogin(authRes: any) {
        const res = await supabase
            .from("profiles")
            .upsert({ id: profileId, telegram: authRes.id, task_notification: taskNotification })
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
            description: "We've linked your account with Telegram, SensAI awaits you.",
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

    async function handleTaskNotificationChange(e: any) {
        const local = parseInt(e.target.value);
        const val = new Date(new Date().setHours(local)).getUTCHours();

        const res = await supabase
            .from("bot")
            .update({ task_notification: val })
            .eq("id", botId);

        if (res.error) {
            toast({
                title: 'Failed to update task notification',
                description: "Seems like something went wrong, please try again.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: isMobile ? "top" : "bottom"
            })
            console.error(res.error);
            return;
        }

        toast({
            title: 'Task notification updated',
            description: "We've updated your task notification settings.",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: isMobile ? "top" : "bottom",
        })

        setTaskNotification(local);
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
                        SensAI
                    </Text>
                    <IconButton
                        ml="1rem"
                        aria-label="help"
                        icon={<FaQuestionCircle size="1.5rem" />}
                        onClick={helpOnOpen}
                        rounded="full"
                    />
                </Center>

                {!telegram ?
                    <Box>
                        <Flex>
                            <Heading>
                                1. Link your Telegram
                            </Heading>

                            <Center>
                                <Icon as={telegram ? FaCheckCircle : FaTimesCircle} ml=".5rem" color={telegram ? "green.500" : "red.500"} boxSize="2rem" />
                            </Center>
                        </Flex>

                        {!telegram && <Center mt=".5rem">
                            <TelegramLoginButton dataOnauth={handleTelegramLogin} botName="MasterYourselfBot" />
                        </Center>}
                    </Box> : telegram && !started ?
                        <Stack spacing="1rem">
                            <Flex>
                                <Heading>
                                    2. Start the bot
                                </Heading>

                                <Center>
                                    <Icon as={started ? FaCheckCircle : FaTimesCircle} ml=".5rem" color={started ? "green.500" : "red.500"} boxSize="2rem" />
                                </Center>
                            </Flex>

                            <Text fontSize="xl">
                                Send <i>/start</i> to @MasterYourselfBot
                            </Text>

                            <Link href={telegram ? "https://t.me/MasterYourselfBot" : ""} target="_blank" style={{ textDecoration: "none" }}>
                                <Button size="lg" isDisabled={!telegram} w="100%" variant="solid" colorScheme="yellow" rounded="full">
                                    Open chat in Telegram
                                </Button>
                            </Link>
                        </Stack> : telegram && started &&
                        <Stack spacing="1rem">
                            <Stack spacing=".5rem">
                                <Heading>Daily Tasks</Heading>
                                <Text>Notify me everyday about my tasks at</Text>
                                <Select colorScheme="yellow" rounded="full" borderColor="gray.500" size="lg" value={taskNotification} onChange={handleTaskNotificationChange}>
                                    <option value='0'>12:00 am</option>
                                    <option value='1'>01:00 am</option>
                                    <option value='2'>02:00 am</option>
                                    <option value='3'>03:00 am</option>
                                    <option value='4'>04:00 am</option>
                                    <option value='5'>05:00 am</option>
                                    <option value='6'>06:00 am</option>
                                    <option value='7'>07:00 am</option>
                                    <option value='8'>08:00 am</option>
                                    <option value='9'>09:00 am</option>
                                    <option value='10'>10:00 am</option>
                                    <option value='11'>11:00 am</option>
                                    <option value='12'>12:00 pm</option>
                                    <option value='13'>1:00 pm</option>
                                    <option value='14'>2:00 pm</option>
                                    <option value='15'>3:00 pm</option>
                                    <option value='16'>4:00 pm</option>
                                    <option value='17'>5:00 pm</option>
                                    <option value='18'>6:00 pm</option>
                                    <option value='19'>7:00 pm</option>
                                    <option value='20'>8:00 pm</option>
                                    <option value='21'>9:00 pm</option>
                                    <option value='22'>10:00 pm</option>
                                    <option value='23'>11:00 pm</option>
                                </Select>
                            </Stack>

                            {/*<Link href={telegram ? "https://t.me/MasterYourselfBot" : ""} target="_blank" style={{ textDecoration: "none" }}>
                                <Button size="lg" isDisabled={!telegram} w="100%" variant="solid" colorScheme="yellow" rounded="full">
                                    Open chat in Telegram
                                </Button>
                            </Link>*/}
                        </Stack>}
            </Stack>

            <Link href="https://t.me/MasterYourselfBot" target="_blank">
                <HStack
                    position="fixed"
                    bottom={["6rem", "2rem"]}
                    right={["1rem", "2rem"]}
                >
                    {isMobile ?
                        <IconButton
                            aria-label="help"
                            icon={<BsFillChatDotsFill color="#555555" size="2rem" />}
                            h="4rem"
                            w="4rem"
                            rounded="full"
                            colorScheme={"yellow"}
                        /> :
                        <Button
                            colorScheme="yellow"
                            w={"12rem"}
                            h="4rem"
                            rounded="full"
                        >
                            <Center fontSize="2xl">
                                <Icon as={BsFillChatDotsFill} mr=".5rem" />
                                <Text>Chat</Text>
                            </Center>
                        </Button>}
                </HStack>
            </Link>

            <SenseiHelpModal isOpen={helpIsOpen} onClose={helpOnClose} />
        </Center >
    );
}