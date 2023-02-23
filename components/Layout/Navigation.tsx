import {
    Box,
    Center,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import {
    AiFillClockCircle,
    AiFillHeart,
    AiOutlineClockCircle,
    AiOutlineHeart,
} from "react-icons/ai";
import { BiBrain } from "react-icons/bi";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { FaBrain } from "react-icons/fa";
import CategoryPicker from "../Pickers/CategoryPicker";

export default function Navigation({
    category,
    setCategory,
    component,
    setComponent,
    onOpen,
    isOpen,
    onClose,
    isMobile,
}: any) {
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

    function Mobile() {
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
                            as={category === CATEGORY_MIND ? FaBrain : BiBrain}
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
                    placement={isMobile ? "bottom" : "top"}
                    onClose={onClose}
                    isOpen={isOpen}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerBody>
                            <Center flexDir="column" py="1rem">
                                <CategoryPicker
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
        );
    }

    return isMobile ? <Mobile /> : <Mobile />;
}
