import { CheckCircleIcon, EmailIcon } from "@chakra-ui/icons";
import { Box, Text, Button, Center, Divider, Flex, Heading, Image, Stack, Icon, HStack } from "@chakra-ui/react";
import { useState } from "react";
import MasteryChecklist from "../components/MasteryChecklist";
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { GrCycle } from "react-icons/gr";
import DayCycle from "../components/DayCycle";
import { GiCycle, GiMeditation, GiShinyApple, GiWeightLiftingUp } from "react-icons/gi";
import { BsJournalText } from "react-icons/bs";
import Head from "next/head";

export default function AppPage() {
    const CATEGORY_TIME = 0;
    const COMPONENT_MASTERY_CHECKLIST = 0;
    const COMPONENT_DAY_CYCLE = 1;

    const CATEGORY_MIND = 1;
    const COMPONENT_MEDITATE = 2;
    const COMPONENT_JOURNAL = 3;

    const CATEGORY_HEALTH = 2;
    const COMPONENT_DIET = 4;
    const COMPONENT_EXERCISE = 5;

    const [category, setCategory] = useState(CATEGORY_TIME);
    const [component, setComponent] = useState(COMPONENT_MASTERY_CHECKLIST);

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
                variant="solid"
                colorScheme={"blackAlpha"}>
                    <Text fontSize="2xl">CONNECT</Text>
                </Button>
            </Center>
        );
    }

    function CategoryComponents() {
        if (category === CATEGORY_TIME) {
            return (
                <Stack spacing="2rem">
                    <Button 
                    onClick={() => setComponent(COMPONENT_MASTERY_CHECKLIST)}
                    colorScheme='yellow'
                    variant={component === COMPONENT_MASTERY_CHECKLIST ? 'solid' : 'ghost'}
                    size="lg"
                    rounded="full"
                    leftIcon={<CheckCircleIcon boxSize="1.5rem" />}>
                        <Text fontSize="xl">Mastery Checklist</Text>
                    </Button>
                    <Button
                    onClick={() => setComponent(COMPONENT_DAY_CYCLE)} 
                    colorScheme='yellow'
                    variant={component === COMPONENT_DAY_CYCLE ? 'solid' : 'ghost'}
                    size="lg"
                    rounded="full"
                    leftIcon={<Icon as={GiCycle} boxSize="1.5rem"/>}>
                        <Text fontSize="xl">Day Cycle</Text>
                    </Button>
                </Stack>
            );
        }
        else if (category === CATEGORY_MIND) {
            return (
                <Stack spacing="2rem">
                    <Button 
                    onClick={() => setComponent(COMPONENT_MEDITATE)}
                    colorScheme='blue'
                    variant={component === COMPONENT_MEDITATE ? 'solid' : 'ghost'}
                    size="lg"
                    rounded="full"
                    leftIcon={<Icon as={GiMeditation} boxSize="1.5rem" />}>
                        <Text fontSize="xl">Meditate</Text>
                    </Button>
                    <Button
                    onClick={() => setComponent(COMPONENT_JOURNAL)} 
                    colorScheme='blue'
                    variant={component === COMPONENT_JOURNAL ? 'solid' : 'ghost'}
                    size="lg"
                    rounded="full"
                    leftIcon={<Icon as={BsJournalText} boxSize="1.5rem" />}>
                        <Text fontSize="xl">Journal</Text>
                    </Button>
                </Stack>
            )
        }
        else if (category === CATEGORY_HEALTH) {
            return (
                <Stack spacing="2rem">
                    <Button 
                    onClick={() => setComponent(COMPONENT_DIET)}
                    colorScheme='green'
                    variant={component === COMPONENT_DIET ? 'solid' : 'ghost'}
                    size="lg"
                    rounded="full"
                    leftIcon={<Icon as={GiShinyApple} boxSize="1.5rem" />}>
                        <Text fontSize="xl">Diet</Text>
                    </Button>
                    <Button
                    onClick={() => setComponent(COMPONENT_EXERCISE)} 
                    colorScheme='green'
                    variant={component === COMPONENT_EXERCISE ? 'solid' : 'ghost'}
                    size="lg"
                    rounded="full"
                    leftIcon={<Icon as={GiWeightLiftingUp} boxSize="1.5rem" />}>
                        <Text fontSize="xl">Exercise</Text>
                    </Button>
                </Stack>
            )
        }
        else {
            return (
                <Text>COMING SOON</Text>
            )
        }
    }

    function Content() {
        switch (component) {
            case COMPONENT_MASTERY_CHECKLIST:
                return <MasteryChecklist/>;
            case COMPONENT_DAY_CYCLE:
                return <DayCycle/>;
            default:
                return <Text>Feature 2</Text>;
        }
    }

    function Connected() {
        return (
            <Flex h="100vh" w="100vw" bg="gray.100" color="gray.800">
                <Box w="25vw" bg="white">
                    <Center h="25vh" w="100%" p="1rem">
                        <Image src="/logo.svg" alt="Logo" maxH="90%" />
                        <Center flexDir="column">
                            <Heading ml="-1rem" fontSize="5xl" letterSpacing={"0.5rem"} fontStyle="italic">ALPHA</Heading>
                            <Text fontStyle="italic" letterSpacing={"0.1rem"}>MASTER YOURSELF</Text>
                        </Center>
                    </Center>
                    <Divider/>
                    <Center h="10vh" w="100%" p="1rem" flexDirection={"column"}>
                        <Stack spacing="0.5rem">
                            <Center>
                                <Text fontSize="sm">{ensName ? ensName : address}</Text>
                            </Center>
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
                                variant={category === CATEGORY_TIME ? "solid" : "outline"}
                                w="5vw">
                                    TIME
                                </Button>
                                <Button
                                onClick={() => setCategory(CATEGORY_MIND)}
                                size="sm" 
                                fontWeight={"bold"}  
                                rounded="full" 
                                colorScheme={"blue"} 
                                variant={category === CATEGORY_MIND ? "solid" : "outline"}
                                w="5vw">
                                    MIND
                                </Button>
                                <Button
                                onClick={() => setCategory(CATEGORY_HEALTH)}
                                size="sm" 
                                fontWeight={"bold"}  
                                rounded="full" 
                                colorScheme={"green"} 
                                variant={category === CATEGORY_HEALTH ? "solid" : "outline"}
                                w="5vw">
                                    HEALTH
                                </Button>
                            </HStack>
                        </Stack>
                    </Center>
                    <Divider/>
                    <Center h="50vh">
                        <CategoryComponents/>
                    </Center>
                </Box>
                <Divider orientation="vertical" />
                <Box w="75vw">
                    <Center h="100%">
                        <Content/>
                    </Center>
                </Box>
            </Flex>
        );
    }

    return (
        <>
            <Head>
                <title>ALPHA - {component}</title>
            </Head>
            {isConnected ? <Connected/> : <NotConnected/>}
        </>
    );
}