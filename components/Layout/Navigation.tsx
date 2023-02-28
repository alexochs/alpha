import {
    Box,
    Center,
    Drawer,
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
import { FaBrain, FaUserCircle } from "react-icons/fa";
import CategoryPicker from "../Pickers/CategoryPicker";
import HealthComponentsList from "./ComponentsLists/HealthComponentsList";
import MindComponentsList from "./ComponentsLists/MindComponentsList";
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

    return (
        <Box>
            <Flex
                position={["fixed", "static"]}
                bottom="0"
                minH="5vh"
                borderTop={["1px solid rgb(0, 0, 0, 0.2)", "0"]}
                w={["100vw", "24rem"]}
                bg="white"
                p=".5rem"
                justifyContent="space-evenly"
            >
                <Center>
                    <Icon
                        cursor={"pointer"}
                        w="2rem"
                        h="2rem"
                        aria-label="time"
                        as={
                            router.asPath.includes("productivity")
                                ? AiFillClockCircle
                                : AiOutlineClockCircle
                        }
                        color={
                            router.asPath.includes("productivity")
                                ? "yellow.400"
                                : "blackAlpha.600"
                        }
                        onClick={() => {
                            productivityOnOpen();
                        }}
                    />
                </Center>

                <Center>
                    <Icon
                        cursor={"pointer"}
                        w="2rem"
                        h="2rem"
                        aria-label="time"
                        as={false ? FaBrain : BiBrain}
                        color={false ? "blue.400" : "blackAlpha.600"}
                        onClick={() => {
                            mindOnOpen();
                        }}
                    />
                </Center>

                <Center>
                    <Icon
                        cursor={"pointer"}
                        w="2rem"
                        h="2rem"
                        aria-label="time"
                        as={false ? AiFillHeart : AiOutlineHeart}
                        color={false ? "green.400" : "blackAlpha.600"}
                        onClick={() => {
                            healthOnOpen();
                        }}
                    />
                </Center>

                <Center>
                    <Icon
                        cursor={"pointer"}
                        w="2rem"
                        h="2rem"
                        aria-label="time"
                        as={false ? BsPeopleFill : BsPeople}
                        color={false ? "red.400" : "blackAlpha.600"}
                        onClick={() => {
                            networkOnOpen();
                        }}
                    />
                </Center>

                {isMobile && <Center>
                    <Link href={`/profiles/${session?.user.id}`}>
                        <IconButton
                            aria-label="userprofile"
                            as={FaUserCircle}
                            rounded="full"
                            cursor="pointer"
                        />
                    </Link>
                </Center>}
            </Flex>

            <Drawer
                placement={isMobile ? "bottom" : "top"}
                onClose={productivityOnClose}
                isOpen={productivityIsOpen}
            >
                <DrawerOverlay />
                <DrawerContent>
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
                <DrawerContent>
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
                <DrawerContent>
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
                <DrawerContent>
                    <DrawerBody>
                        <Center flexDir="column" py="1rem">
                            <NetworkComponentsList onClose={networkOnClose} />
                        </Center>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
