import { CheckCircleIcon, EmailIcon } from "@chakra-ui/icons";
import { Box, Text, Button, Center, Divider, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import { useState } from "react";
import MasteryChecklist from "../components/MasteryChecklist";
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export default function AppPage() {
    const CATEGORY_MASTERY_CHECKLIST = 0;
    const CATEGORY_FEATURE = 1;
    const [category, setCategory] = useState(CATEGORY_MASTERY_CHECKLIST);

    const { address, isConnected } = useAccount();
    const { data: ensName } = useEnsName({ address })
    const { connect } = useConnect({connector: new InjectedConnector()});
    const { disconnect } = useDisconnect();

    function NotConnected() {
        return (
            <Center h="100vh" w="100vw" bg="gray.100" color="gray.800" flexDir="column">
                <Heading fontSize="6xl" fontStyle={"italic"} letterSpacing={"0.5rem"}>CONNECT YOUR WALLET TO ENTER</Heading>
                <Box py="2rem"/>
                <Button
                onClick={() => connect()}
                size="lg" 
                letterSpacing={"0.1rem"} 
                rounded="full" 
                variant="outline" 
                colorScheme={"yellow"}>
                    <Text fontSize="2xl">CONNECT</Text>
                </Button>
            </Center>
        );
    }

    function Connected() {
        return (
            <Flex h="100vh" w="100vw" bg="gray.100" color="gray.800">
                <Box w="25vw">
                    <Center h="25vh" w="100%" p="1rem">
                        <Image src="/logo.svg" alt="Logo" maxH="90%" />
                        <Heading ml="-1rem" fontSize="5xl" letterSpacing={"0.5rem"} fontStyle="italic">ALPHA</Heading>
                    </Center>
                    <Divider/>
                    <Center h="10vh" w="100%" p="1rem" flexDirection={"column"}>
                        <Stack spacing="0.5rem">
                            <Text fontSize="sm">{ensName ? ensName : address}</Text>
                            <Button
                            onClick={() => disconnect()}
                            size="sm" 
                            fontWeight={"normal"} 
                            fontSize="xs" 
                            rounded="full" 
                            colorScheme={"red"} 
                            variant="ghost"
                            maxW="10vw">
                                DISCONNECT
                            </Button>
                        </Stack>
                    </Center>
                    <Divider/>
                    <Center h="65vh">
                        <Stack spacing="2rem">
                            <Button 
                            onClick={() => setCategory(CATEGORY_MASTERY_CHECKLIST)}
                            colorScheme='yellow'
                            variant={category === CATEGORY_MASTERY_CHECKLIST ? 'solid' : 'ghost'}
                            size="lg"
                            rounded="full"
                            leftIcon={<CheckCircleIcon boxSize="1.5rem" />}>
                                <Text fontSize="xl">Mastery Checklist</Text>
                            </Button>
                            <Button
                            onClick={() => setCategory(CATEGORY_FEATURE)} 
                            colorScheme='yellow'
                            variant={category === CATEGORY_FEATURE ? 'solid' : 'ghost'}
                            size="lg"
                            rounded="full"
                            leftIcon={<CheckCircleIcon boxSize="1.5rem" />}>
                                <Text fontSize="xl">Another Feature</Text>
                            </Button>
                        </Stack>
                    </Center>
                </Box>
                <Divider orientation="vertical" />
                <Box w="75vw">
                    <Center h="100%">
                        {category === CATEGORY_MASTERY_CHECKLIST ? (
                            <MasteryChecklist/>
                        ) : (
                            <Text>Feature 2</Text>
                        )}
                    </Center>
                </Box>
            </Flex>
        );
    }

    return isConnected ? <Connected/> : <NotConnected/>;
}