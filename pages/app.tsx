import { CheckCircleIcon, EmailIcon } from "@chakra-ui/icons";
import {
    Box,
    Text,
    Button,
    Center,
    Divider,
    Flex,
    Heading,
    Image,
    Stack,
    Icon,
    HStack,
    Link,
} from "@chakra-ui/react";
import { useState } from "react";
import MasteryChecklist from "../components/time/MasteryChecklist";
import { GrCycle } from "react-icons/gr";
import HabitTracker from "../components/time/HabitTracker";
import {
    GiCycle,
    GiMeditation,
    GiShinyApple,
    GiWeightLiftingUp,
} from "react-icons/gi";
import { BsJournalText } from "react-icons/bs";
import { MdOutlineForum } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import Head from "next/head";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
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

    const allowList = ["mail@alexochs.de"];
    if (!allowList.includes(session.user.email!)) {
        return {
            redirect: {
                destination: "/access-denied",
                permanent: false,
            },
        };
    }

    return {
        props: {
            initialSession: session,
            user: session.user,
        },
    };
}

export default function AppPage({ initialSession, user }: any) {
    const router = useRouter();
    const supabase = useSupabaseClient();

    const CATEGORY_TIME = 0;
    const COMPONENT_MASTERY_CHECKLIST = 0;
    const COMPONENT_HABIT_TRACKER = 1;

    const CATEGORY_MIND = 1;
    const COMPONENT_MEDITATE = 2;
    const COMPONENT_JOURNAL = 3;

    const CATEGORY_HEALTH = 2;
    const COMPONENT_DIET = 4;
    const COMPONENT_EXERCISE = 5;

    const CATEGORY_NETWORK = 3;
    const COMPONENT_NEWS_TICKER = 7;
    const COMPONENT_FORUM = 8;
    const COMPONENT_MEMBERS = 9;
    const COMPONENT_SOCIAL_MEDIA = 10;

    const [category, setCategory] = useState(CATEGORY_TIME);
    const [component, setComponent] = useState(COMPONENT_MASTERY_CHECKLIST);

    const hearts = ["💛", "💙", "💚", "❤️"];

    function CategoryComponents() {
        if (category === CATEGORY_TIME) {
            return (
                <Stack spacing="2rem">
                    <Button
                        onClick={() =>
                            setComponent(COMPONENT_MASTERY_CHECKLIST)
                        }
                        colorScheme="yellow"
                        variant={
                            component === COMPONENT_MASTERY_CHECKLIST
                                ? "solid"
                                : "ghost"
                        }
                        size="lg"
                        rounded="full"
                        leftIcon={<CheckCircleIcon boxSize="1.5rem" />}
                    >
                        <Text fontSize="xl">Mastery Checklist</Text>
                    </Button>
                    <Button
                        onClick={() => setComponent(COMPONENT_HABIT_TRACKER)}
                        colorScheme="yellow"
                        variant={
                            component === COMPONENT_HABIT_TRACKER
                                ? "solid"
                                : "ghost"
                        }
                        size="lg"
                        rounded="full"
                        leftIcon={<Icon as={GiCycle} boxSize="1.5rem" />}
                    >
                        <Text fontSize="xl">Habit Tracker</Text>
                    </Button>
                </Stack>
            );
        } else if (category === CATEGORY_MIND) {
            return (
                <Stack spacing="2rem">
                    <Button
                        onClick={() => setComponent(COMPONENT_MEDITATE)}
                        colorScheme="blue"
                        variant={
                            component === COMPONENT_MEDITATE ? "solid" : "ghost"
                        }
                        size="lg"
                        rounded="full"
                        leftIcon={<Icon as={GiMeditation} boxSize="1.5rem" />}
                    >
                        <Text fontSize="xl">Meditate</Text>
                    </Button>
                    <Button
                        onClick={() => setComponent(COMPONENT_JOURNAL)}
                        colorScheme="blue"
                        variant={
                            component === COMPONENT_JOURNAL ? "solid" : "ghost"
                        }
                        size="lg"
                        rounded="full"
                        leftIcon={<Icon as={BsJournalText} boxSize="1.5rem" />}
                    >
                        <Text fontSize="xl">Journal</Text>
                    </Button>
                </Stack>
            );
        } else if (category === CATEGORY_HEALTH) {
            return (
                <Stack spacing="2rem">
                    <Button
                        onClick={() => setComponent(COMPONENT_DIET)}
                        colorScheme="green"
                        variant={
                            component === COMPONENT_DIET ? "solid" : "ghost"
                        }
                        size="lg"
                        rounded="full"
                        leftIcon={<Icon as={GiShinyApple} boxSize="1.5rem" />}
                    >
                        <Text fontSize="xl">Diet</Text>
                    </Button>
                    <Button
                        onClick={() => setComponent(COMPONENT_EXERCISE)}
                        colorScheme="green"
                        variant={
                            component === COMPONENT_EXERCISE ? "solid" : "ghost"
                        }
                        size="lg"
                        rounded="full"
                        leftIcon={
                            <Icon as={GiWeightLiftingUp} boxSize="1.5rem" />
                        }
                    >
                        <Text fontSize="xl">Exercise</Text>
                    </Button>
                </Stack>
            );
        } else if (category === CATEGORY_NETWORK) {
            return (
                <Stack spacing="2rem">
                    <Button
                        onClick={() => setComponent(COMPONENT_FORUM)}
                        colorScheme="red"
                        variant={
                            component === COMPONENT_FORUM ? "solid" : "ghost"
                        }
                        size="lg"
                        rounded="full"
                        leftIcon={<Icon as={MdOutlineForum} boxSize="1.5rem" />}
                    >
                        <Text fontSize="xl">Forum</Text>
                    </Button>
                    <Button
                        onClick={() => setComponent(COMPONENT_NEWS_TICKER)}
                        colorScheme="red"
                        variant={
                            component === COMPONENT_NEWS_TICKER
                                ? "solid"
                                : "ghost"
                        }
                        size="lg"
                        rounded="full"
                        leftIcon={<Icon as={BiNews} boxSize="1.5rem" />}
                    >
                        <Text fontSize="xl">News Ticker</Text>
                    </Button>
                    <Button
                        onClick={() => setComponent(COMPONENT_SOCIAL_MEDIA)}
                        colorScheme="red"
                        variant={
                            component === COMPONENT_SOCIAL_MEDIA
                                ? "solid"
                                : "ghost"
                        }
                        size="lg"
                        rounded="full"
                        leftIcon={
                            <Icon as={IoShareSocialSharp} boxSize="1.5rem" />
                        }
                    >
                        <Text fontSize="xl">Social Media</Text>
                    </Button>
                    <Button
                        onClick={() => setComponent(COMPONENT_MEMBERS)}
                        colorScheme="red"
                        variant={
                            component === COMPONENT_MEMBERS ? "solid" : "ghost"
                        }
                        size="lg"
                        rounded="full"
                        leftIcon={<Icon as={FaUsers} boxSize="1.5rem" />}
                    >
                        <Text fontSize="xl">Members</Text>
                    </Button>
                </Stack>
            );
        } else {
            return <Text>COMING SOON</Text>;
        }
    }

    function Content() {
        switch (component) {
            case COMPONENT_MASTERY_CHECKLIST:
                return <MasteryChecklist profileId={user.id} />;
            case COMPONENT_HABIT_TRACKER:
                return <HabitTracker />;
            default:
                return <Text>Oops, something went wrong!</Text>;
        }
    }

    function Connected() {
        return (
            <Flex
                h="100vh"
                w="100vw"
                bg="gray.100"
                color="gray.800"
                overflow={"hidden"}
            >
                <Box w="25vw" bg="white">
                    <Center h="25vh" w="100%" py="1rem">
                        <Image src="/logo.png" alt="Logo" maxH="80%" />
                        <Center pl="1rem" flexDir="column">
                            <Heading fontSize="4xl" letterSpacing={"0.5rem"}>
                                MASTER
                                <br />
                                YOURSELF
                            </Heading>
                        </Center>
                    </Center>

                    <Divider />

                    <Center h="10vh" w="100%" p="1rem" flexDirection={"column"}>
                        <Button
                            fontSize="sm"
                            variant="ghost"
                            rounded="full"
                            onClick={() => router.push(`/profiles/${user.id}`)}
                        >
                            {user.email}
                        </Button>
                    </Center>

                    <Divider />

                    <Center h="15vh" w="100%" p="1rem" flexDirection={"column"}>
                        <Stack spacing="0.5rem">
                            <Center>
                                <Text fontWeight={"bold"}>Master your</Text>
                            </Center>
                            <HStack>
                                <Button
                                    onClick={() => setCategory(CATEGORY_TIME)}
                                    size="sm"
                                    fontWeight={"bold"}
                                    rounded="full"
                                    colorScheme={"yellow"}
                                    variant={
                                        category === CATEGORY_TIME
                                            ? "solid"
                                            : "outline"
                                    }
                                    w="5vw"
                                >
                                    TIME
                                </Button>
                                <Button
                                    onClick={() => setCategory(CATEGORY_MIND)}
                                    size="sm"
                                    fontWeight={"bold"}
                                    rounded="full"
                                    colorScheme={"blue"}
                                    variant={
                                        category === CATEGORY_MIND
                                            ? "solid"
                                            : "outline"
                                    }
                                    w="5vw"
                                >
                                    MIND
                                </Button>
                                <Button
                                    onClick={() => setCategory(CATEGORY_HEALTH)}
                                    size="sm"
                                    fontWeight={"bold"}
                                    rounded="full"
                                    colorScheme={"green"}
                                    variant={
                                        category === CATEGORY_HEALTH
                                            ? "solid"
                                            : "outline"
                                    }
                                    w="5vw"
                                >
                                    HEALTH
                                </Button>
                                <Button
                                    onClick={() =>
                                        setCategory(CATEGORY_NETWORK)
                                    }
                                    size="sm"
                                    fontWeight={"bold"}
                                    rounded="full"
                                    colorScheme={"red"}
                                    variant={
                                        category === CATEGORY_NETWORK
                                            ? "solid"
                                            : "outline"
                                    }
                                    w="6vw"
                                >
                                    NETWORK
                                </Button>
                            </HStack>
                        </Stack>
                    </Center>

                    <Divider />

                    <Center h="45vh">
                        <CategoryComponents />
                    </Center>
                    <Divider />

                    <Center h="5vh">
                        <Link href="https://alexochs.de" target="_blank">
                            <Text fontSize="xs">
                                Made with {hearts[category]} by Alex Ochs
                            </Text>
                        </Link>
                    </Center>
                </Box>
                <Divider orientation="vertical" />
                <Box w="75vw" h="100vh" py="2rem" px="1rem" overflow={"scroll"}>
                    <Content />
                </Box>
            </Flex>
        );
    }

    return <>{user ? <Connected /> : <Text>not connected</Text>}</>;
}
