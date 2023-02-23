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
import MasteryChecklist from "../components/Time/MasteryChecklist";
import { GrCycle } from "react-icons/gr";
import HabitTracker from "../components/Time/HabitTracker";
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
import DatePicker from "../components/Pickers/DatePicker";
import CategoryComponents from "../components/Pickers/CategoryPicker";
import Navigation from "../components/Layout/Navigation";
import Topbar from "../components/Layout/Topbar";

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

    const isMobile = useMediaQuery("(max-width: 768px)")[0];
    console.log("isMobile => ", isMobile);

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

    function Content() {
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
                return (
                    <HabitTracker
                        profileId={user.id}
                        date={date}
                        isMobile={isMobile}
                    />
                );
            default:
                return <Text>Oops, something went wrong!</Text>;
        }
    }

    function Mobile() {
        return (
            <Box maxW="100vw" color="gray.700">
                <Topbar
                    date={date}
                    setDate={setDate}
                    category={category}
                    setCategory={setCategory}
                    component={component}
                    setComponent={setComponent}
                    onOpen={onOpen}
                    isOpen={isOpen}
                    onClose={onClose}
                    isMobile={isMobile}
                />

                <Box pt="6rem" bg="gray.100" minH="100vh">
                    <Content />
                </Box>

                <Navigation
                    category={category}
                    setCategory={setCategory}
                    component={component}
                    setComponent={setComponent}
                    onOpen={onOpen}
                    isOpen={isOpen}
                    onClose={onClose}
                    isMobile={isMobile}
                />
            </Box>
        );
    }

    function Desktop() {
        return (
            <Box>
                <Topbar
                    date={date}
                    setDate={setDate}
                    category={category}
                    setCategory={setCategory}
                    component={component}
                    setComponent={setComponent}
                    onOpen={onOpen}
                    isOpen={isOpen}
                    onClose={onClose}
                    isMobile={isMobile}
                />

                <Box bg="gray.100" w="100vw" minH="100vh" pt="2rem">
                    <Content />
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

/*
Desktop
    Topbar
        Logo
        Navigation
        Datepicker
    Content

Mobile
    Topbar
        Datepicker
    Content
    Bottom Bar
        Navigation
*/
