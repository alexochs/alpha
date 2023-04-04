import { CheckCircleIcon } from "@chakra-ui/icons";
import {
    Box,
    Center,
    Drawer,
    Text,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Icon,
    IconButton,
    Link,
    useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
    AiFillClockCircle,
    AiFillHeart,
    AiOutlineClockCircle,
    AiOutlineHeart,
} from "react-icons/ai";
import { BiBrain } from "react-icons/bi";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { FaBars, FaBrain, FaRobot, FaUserCircle } from "react-icons/fa";
import { GiCycle, GiDividedSpiral } from "react-icons/gi";
import HealthComponentsList from "./ComponentsLists/HealthComponentsList";
import MindComponentsList from "./ComponentsLists/MindComponentsList";
import MiscComponentsList from "./ComponentsLists/MiscComponentsList";
import NetworkComponentsList from "./ComponentsLists/NetworkComponentsList";
import ProductivityComponentsList from "./ComponentsLists/ProductivityComponentsList";

export default function Navigation({ isMobile }: any) {
    const session = useSession();
    const router = useRouter();

    const {
        isOpen: productivityIsOpen,
        onOpen: productivityOnOpen,
        onClose: productivityOnClose,
    } = useDisclosure();

    const {
        isOpen: mindIsOpen,
        onOpen: mindOnOpen,
        onClose: mindOnClose,
    } = useDisclosure();

    const {
        isOpen: healthIsOpen,
        onOpen: healthOnOpen,
        onClose: healthOnClose,
    } = useDisclosure();

    const {
        isOpen: networkIsOpen,
        onOpen: networkOnOpen,
        onClose: networkOnClose,
    } = useDisclosure();

    const {
        isOpen: miscIsOpen,
        onOpen: miscOnOpen,
        onClose: miscOnClose,
    } = useDisclosure();

    return (
        <Box>
            <Flex
                position={["fixed", "static"]}
                bottom="0"
                borderTop={["1px solid rgb(0, 0, 0, 0.2)", "0"]}
                w={["100vw", "32rem"]}
                bg="white"
                p=".5rem"
                justifyContent="space-evenly"
            >
                <Link href="/productivity/daily-tasks" style={{ textDecoration: "none" }} _hover={{ bg: "blackAlpha.50" }} p=".5rem" rounded="xl">
                    <Center
                        flexDir={"column"}
                        cursor={"pointer"}

                    >
                        <Icon
                            w="1.5rem"
                            h="1.5rem"
                            aria-label="time"
                            as={
                                router.asPath.includes("daily-tasks")
                                    ? CheckCircleIcon
                                    : CheckCircleIcon
                            }
                            color={
                                router.asPath.includes("daily-tasks")
                                    ? "yellow.400"
                                    : "gray.500"
                            }
                        />
                        <Text
                            mt=".25rem"
                            fontSize={["xs", "sm"]}
                            color={router.asPath.includes("daily-tasks")
                                ? "gray.700"
                                : "gray.500"}
                        >
                            Daily Tasks
                        </Text>
                    </Center>
                </Link>

                <Link href="/productivity/habit-tracker" style={{ textDecoration: "none" }} _hover={{ bg: "blackAlpha.50" }} p=".5rem" rounded="xl">
                    <Center
                        flexDir={"column"}
                        cursor={"pointer"}

                    >
                        <Icon
                            w="1.5rem"
                            h="1.5rem"
                            aria-label="time"
                            as={
                                router.asPath.includes("habit-tracker")
                                    ? GiCycle
                                    : GiCycle
                            }
                            color={
                                router.asPath.includes("habit-tracker")
                                    ? "yellow.400"
                                    : "gray.500"
                            }
                        />
                        <Text
                            mt=".25rem"
                            fontSize={["xs", "sm"]}
                            color={router.asPath.includes("habit-tracker")
                                ? "gray.700"
                                : "gray.500"}
                        >
                            Habit Tracker
                        </Text>
                    </Center>
                </Link>

                <Link href="/productivity/deep-work" style={{ textDecoration: "none" }} _hover={{ bg: "blackAlpha.50" }} p=".5rem" rounded="xl">
                    <Center
                        flexDir={"column"}
                        cursor={"pointer"}

                    >
                        <Icon
                            w="1.5rem"
                            h="1.5rem"
                            aria-label="time"
                            as={
                                router.asPath.includes("deep-work")
                                    ? GiDividedSpiral
                                    : GiDividedSpiral
                            }
                            color={
                                router.asPath.includes("deep-work")
                                    ? "yellow.400"
                                    : "gray.500"
                            }
                        />
                        <Text
                            mt=".25rem"
                            fontSize={["xs", "sm"]}
                            color={router.asPath.includes("deep-work")
                                ? "gray.700"
                                : "gray.500"}
                        >
                            Deep Work
                        </Text>
                    </Center>
                </Link>

                <Link href="/network/sensai" style={{ textDecoration: "none" }} _hover={{ bg: "blackAlpha.50" }} p=".5rem" rounded="xl">
                    <Center
                        flexDir={"column"}
                        cursor={"pointer"}

                    >
                        <Icon
                            w="1.5rem"
                            h="1.5rem"
                            aria-label="time"
                            as={
                                router.asPath.includes("sensai")
                                    ? FaRobot
                                    : FaRobot
                            }
                            color={
                                router.asPath.includes("sensai")
                                    ? "yellow.400"
                                    : "gray.500"
                            }
                        />
                        <Text
                            mt=".25rem"
                            fontSize={["xs", "sm"]}
                            color={router.asPath.includes("sensai")
                                ? "gray.700"
                                : "gray.500"}
                        >
                            SensAI
                        </Text>
                    </Center>
                </Link>

                <Center _hover={{ bg: "blackAlpha.50" }} p=".5rem" rounded="xl">
                    <Icon
                        cursor={"pointer"}
                        w="2rem"
                        h="2rem"
                        aria-label="time"
                        as={false ? FaBars : FaBars}
                        color={false ? "gray.700" : "gray.500"}
                        onClick={() => {
                            miscOnOpen();
                        }}
                    />
                </Center>
            </Flex>

            <Drawer
                placement={isMobile ? "bottom" : "top"}
                onClose={productivityOnClose}
                isOpen={productivityIsOpen}
            >
                <DrawerOverlay />
                <DrawerContent roundedBottom={["0", "3xl"]} roundedTop={["3xl", "0"]}>
                    <DrawerBody>
                        <Center flexDir="column" py="1rem">
                            <ProductivityComponentsList
                                onClose={productivityOnClose}
                            />
                        </Center>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <Drawer
                placement={isMobile ? "bottom" : "top"}
                onClose={mindOnClose}
                isOpen={mindIsOpen}
            >
                <DrawerOverlay />
                <DrawerContent roundedBottom={["0", "3xl"]} roundedTop={["3xl", "0"]}>
                    <DrawerBody>
                        <Center flexDir="column" py="1rem">
                            <MindComponentsList onClose={mindOnClose} />
                        </Center>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <Drawer
                placement={isMobile ? "bottom" : "top"}
                onClose={healthOnClose}
                isOpen={healthIsOpen}
            >
                <DrawerOverlay />
                <DrawerContent roundedBottom={["0", "3xl"]} roundedTop={["3xl", "0"]}>
                    <DrawerBody>
                        <Center flexDir="column" py="1rem">
                            <HealthComponentsList onClose={healthOnClose} />
                        </Center>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <Drawer
                placement={isMobile ? "bottom" : "top"}
                onClose={networkOnClose}
                isOpen={networkIsOpen}
            >
                <DrawerOverlay />
                <DrawerContent roundedBottom={["0", "3xl"]} roundedTop={["3xl", "0"]}>
                    <DrawerBody>
                        <Center flexDir="column" py="1rem">
                            <NetworkComponentsList onClose={networkOnClose} />
                        </Center>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <Drawer
                placement={isMobile ? "bottom" : "top"}
                onClose={miscOnClose}
                isOpen={miscIsOpen}
            >
                <DrawerOverlay />
                <DrawerContent roundedBottom={["0", "3xl"]} roundedTop={["3xl", "0"]}>
                    <DrawerBody>
                        <Center flexDir="column" py="1rem">
                            <MiscComponentsList onClose={miscOnClose} />
                        </Center>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
