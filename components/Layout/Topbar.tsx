import { Box, Center, Flex, Heading, IconButton, Link, useMediaQuery } from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import { FaBars, FaHamburger, FaUserCircle } from "react-icons/fa";
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
    const session = useSession();

    function Mobile() {
        return (
            <Center
                //position="fixed"
                //top="0"
                w="100vw"
                h="4rem"
                flexDir="column"
                bg="white"
            >
                <Box color="gray.500">
                    <DatePicker />
                </Box>
            </Center>
        );
    }

    function Desktop() {
        return (
            <Flex
                px="4rem"
                py=".5rem"
            >
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

                <Center flex={1} color="gray.500">
                    <DatePicker />
                </Center>

                {/*<Center flex={1} ml="-6rem">
                    <Link href={`/profiles/${session?.user.id}`}>
                        <IconButton
                            aria-label="userprofile"
                            as={FaBars}
                            rounded="full"
                            cursor="pointer"
                        />
                    </Link>
                </Center>*/}
            </Flex>
        );
    }

    return isMobile ? <Mobile /> : <Desktop />;
}
