import { Center, Checkbox, Flex, Heading, Text, SimpleGrid, Input, VStack, HStack, Stack, TableContainer, Table, Tbody, Tr, Td, Button, Thead, Th, Box, useDisclosure, Icon, IconButton, useMediaQuery, useToast } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { FaPlus, FaPlusCircle, FaQuestionCircle } from "react-icons/fa";
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

    console.log(data);

    return {
        props: {
            profileId,
            telegram: data[0].telegram,
        },
    };
}

export default function HabitTrackerPage({ profileId, initialTelegram }: any) {
    const isMobile = useMediaQuery("(max-width: 768px)")[0];
    const supabase = useSupabaseClient();
    const toast = useToast();

    const { isOpen: helpIsOpen, onOpen: helpOnOpen, onClose: helpOnClose } = useDisclosure();

    const [telegram, setTelegram] = useState(initialTelegram);
    const [username, setUsername] = useState(telegram);
    const [invalidUsername, setInvalidUsername] = useState(false);

    async function updateUsername() {
        if (username === "" || username[0] !== "@") {
            setInvalidUsername(true);
            toast({
                title: 'Invalid username',
                description: "Your username seems to be invalid, it should start with @.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: isMobile ? "top" : "bottom",
            })
            return;
        }

        setInvalidUsername(false);

        const res = await supabase
            .from("profiles")
            .upsert({ id: profileId, telegram: username })
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
    }

    async function sendTestMessage() {
        await fetch("/api/tg-sendMessage");
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

                <Box>
                    <Text fontSize="xl" fontWeight="bold">
                        Link your Telegram
                    </Text>

                    <Center mt=".5rem">
                        {/*<Input
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            isInvalid={invalidUsername}
                            variant="outline"
                            placeholder="@username"
                            rounded="full"
                            w="16rem"
                        />

                        <Button
                            ml="1rem"
                            rounded="full"
                            colorScheme={"red"}
                            variant="outline"
                            onClick={updateUsername}
                        >
                            Link account
                        </Button>*/}
                        <TelegramLoginButton dataOnauth={handleTelegramLogin} botName="MasterYourselfBot" />,
                    </Center>
                </Box>

                <Button
                    rounded="full"
                    colorScheme={"red"}
                    variant="solid"
                    onClick={sendTestMessage}
                    isDisabled={!telegram}
                >
                    Send test message
                </Button>
            </Stack>

            <SenseiHelpModal isOpen={helpIsOpen} onClose={helpOnClose} />
        </Center>
    );
}