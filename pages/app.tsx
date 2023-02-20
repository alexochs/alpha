import { CheckCircleIcon, EmailIcon, SearchIcon } from "@chakra-ui/icons";
import {
    Box,
    MenuButton,
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
    useMediaQuery,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverArrow,
    PopoverContent,
    PopoverCloseButton,
    PopoverBody,
    MenuList,
    MenuItem,
    Menu,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    useDisclosure,
    VStack,
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
import {
    AiFillClockCircle,
    AiFillHeart,
    AiOutlineClockCircle,
    AiOutlineHeart,
} from "react-icons/ai";
import { BsJournalText, BsPeople, BsPeopleFill } from "react-icons/bs";
import { MdOutlineForum } from "react-icons/md";
import { BiBrain, BiNews } from "react-icons/bi";
import { FaBrain, FaUsers } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import Head from "next/head";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import DatePicker from "../components/DatePicker";
import CategoryComponents from "../components/CategoryComponents";

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

    const allowList = ["mail@alexochs.de", "maltestarck02@gmail.com"];
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
    const { isOpen, onOpen, onClose } = useDisclosure();

    const router = useRouter();
    const supabase = useSupabaseClient();

    const isMobile = useMediaQuery("(max-width: 600px)")[0];

    const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

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

    function Content(isMobile: any) {
        switch (component) {
            case COMPONENT_MASTERY_CHECKLIST:
                return (
                    <MasteryChecklist
                        profileId={user.id}
                        date={date}
                        isMobile={isMobile}
                    />
                );
            case COMPONENT_HABIT_TRACKER:
                return <HabitTracker profileId={user.id} date={date} />;
            default:
                return <Text>Oops, something went wrong!</Text>;
        }
    }

    function Desktop() {
        return (
            <Flex
                h="100vh"
                w="100vw"
                bg="gray.100"
                color="gray.800"
                overflow={"hidden"}
            >
                <Box w="25vw" bg="white">
                    <Center w="100%" py="2rem" flexDir={"column"}>
                        <Heading
                            fontSize="4xl"
                            letterSpacing={"0.5rem"}
                            pb="1rem"
                        >
                            MASTER
                            <br />
                            YOURSELF
                        </Heading>
                        <DatePicker date={date} setDate={setDate} />
                    </Center>

                    <Divider />

                    <Center
                        h="10vh"
                        w="100%"
                        p="2rem"
                        px="1rem"
                        flexDirection={"column"}
                    >
                        <Button
                            fontSize="sm"
                            variant="ghost"
                            rounded="full"
                            onClick={() => router.push(`/profiles/${user.id}`)}
                            p="1rem"
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
                        <CategoryComponents
                            category={category}
                            setCategory={setCategory}
                            component={component}
                            setComponent={setComponent}
                        />
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

    function Mobile() {
        return (
            <Box maxW="100vw" color="gray.700">
                <Center
                    position="fixed"
                    top="0"
                    w="100vw"
                    minH="4rem"
                    flexDir="column"
                    pt="1rem"
                    borderBottom={"1px solid rgb(0, 0, 0, 0.2)"}
                    bg="white"
                >
                    <Heading fontSize="lg" letterSpacing={"0.5rem"}>
                        MASTER YOURSELF
                    </Heading>

                    <Box color="gray">
                        <DatePicker date={date} setDate={setDate} />
                    </Box>
                </Center>

                <Box pt="6rem" bg="gray.100" minH="100vh">
                    <Content isMobile={isMobile} />
                </Box>

                <Box>
                    <Flex
                        position="fixed"
                        bottom="0"
                        minH="5vh"
                        borderTop="1px solid rgb(0, 0, 0, 0.2)"
                        w="100vw"
                        bg="white"
                        p=".5rem"
                        justifyContent="space-evenly"
                    >
                        <Center>
                            <Icon
                                w="2rem"
                                h="2rem"
                                aria-label="time"
                                as={
                                    category === CATEGORY_TIME
                                        ? AiFillClockCircle
                                        : AiOutlineClockCircle
                                }
                                color={
                                    category === CATEGORY_TIME
                                        ? "yellow.400"
                                        : "blackAlpha.600"
                                }
                                onClick={() => {
                                    setCategory(CATEGORY_TIME);
                                    onOpen();
                                }}
                            />
                        </Center>

                        <Center>
                            <Icon
                                w="2rem"
                                h="2rem"
                                aria-label="time"
                                as={
                                    category === CATEGORY_MIND
                                        ? FaBrain
                                        : BiBrain
                                }
                                color={
                                    category === CATEGORY_MIND
                                        ? "blue.400"
                                        : "blackAlpha.600"
                                }
                                onClick={() => {
                                    setCategory(CATEGORY_MIND);
                                    onOpen();
                                }}
                            />
                        </Center>

                        <Center>
                            <Icon
                                w="2rem"
                                h="2rem"
                                aria-label="time"
                                as={
                                    category === CATEGORY_HEALTH
                                        ? AiFillHeart
                                        : AiOutlineHeart
                                }
                                color={
                                    category === CATEGORY_HEALTH
                                        ? "green.400"
                                        : "blackAlpha.600"
                                }
                                onClick={() => {
                                    setCategory(CATEGORY_HEALTH);
                                    onOpen();
                                }}
                            />
                        </Center>

                        <Center>
                            <Icon
                                w="2rem"
                                h="2rem"
                                aria-label="time"
                                as={
                                    category === CATEGORY_NETWORK
                                        ? BsPeopleFill
                                        : BsPeople
                                }
                                color={
                                    category === CATEGORY_NETWORK
                                        ? "red.400"
                                        : "blackAlpha.600"
                                }
                                onClick={() => {
                                    setCategory(CATEGORY_NETWORK);
                                    onOpen();
                                }}
                            />
                        </Center>
                    </Flex>

                    <Drawer
                        placement={"bottom"}
                        onClose={onClose}
                        isOpen={isOpen}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerBody>
                                <Center flexDir="column" py="1rem">
                                    <CategoryComponents
                                        category={category}
                                        setCategory={setCategory}
                                        component={component}
                                        setComponent={setComponent}
                                        onClose={onClose}
                                    />
                                </Center>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </Box>
            </Box>
        );
    }

    return (
        <>
            {user ? (
                isMobile ? (
                    <Mobile />
                ) : (
                    <Desktop />
                )
            ) : (
                <Text>not connected</Text>
            )}
        </>
    );
}
