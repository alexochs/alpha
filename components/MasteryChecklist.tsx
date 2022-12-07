import { Center, Flex, Heading, Stack } from "@chakra-ui/react";

export default function MasteryChecklist() {
    return (
        <Stack>
            <Center flexDir={"column"}>
                <Heading fontSize="8xl" letterSpacing={"0.5rem"}>MASTERY&nbsp;</Heading>
                <Heading fontSize="8xl" letterSpacing={"0.5rem"}>CHECKLIST</Heading>
            </Center>
        </Stack>
    );
}