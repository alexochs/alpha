import { Box, Center, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import DatePicker from "../Pickers/DatePicker";
import Navigation from "./Navigation";

export default function Topbar({
    date,
    setDate,
    category,
    setCategory,
    component,
    setComponent,
    onOpen,
    isOpen,
    onClose,
    isMobile,
}: any) {
    function Mobile() {
        return (
            <Center
                position="fixed"
                top="0"
                w="100vw"
                minH="4rem"
                flexDir="column"
                pt="1rem"
                borderBottom={"1px solid rgb(0, 0, 0, 0.2)"}
                bg="white"
                zIndex={1}
            >
                <Heading fontSize="lg" letterSpacing={"0.5rem"}>
                    MASTER YOURSELF
                </Heading>

                <Box color="gray">
                    <DatePicker date={date} setDate={setDate} />
                </Box>
            </Center>
        );
    }

    function Desktop() {
        return (
            <Flex px="4rem" py=".5rem">
                <Center flex={1}>
                    <Heading fontSize="2xl" letterSpacing={"0.5rem"}>
                        MASTER
                        <br />
                        YOURSELF
                    </Heading>
                </Center>

                <Center flex={1}>
                    <Navigation
                        category={category}
                        setCategory={setCategory}
                        component={component}
                        setComponent={setComponent}
                        onOpen={onOpen}
                        isOpen={isOpen}
                        onClose={onClose}
                    />
                </Center>

                <Center flex={1}>
                    <DatePicker date={date} setDate={setDate} />
                </Center>
            </Flex>
        );
    }

    return isMobile ? <Mobile /> : <Desktop />;
}
