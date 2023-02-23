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
    isMobile,
}: any) {
    function Mobile() {
        return (
            <Center
                //position="fixed"
                //top="0"
                w="100vw"
                minH="4rem"
                flexDir="column"
                pt=".5rem"
                borderBottom={"1px solid rgb(0, 0, 0, 0.2)"}
                bg="white"
            >
                <Heading fontSize="lg" letterSpacing={"0.5rem"}>
                    MASTER YOURSELF
                </Heading>

                <Box color="gray">
                    <DatePicker />
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
                    <Navigation isMobile={isMobile} />
                </Center>

                <Center flex={1}>
                    <DatePicker />
                </Center>
            </Flex>
        );
    }

    return isMobile ? <Mobile /> : <Desktop />;
}
