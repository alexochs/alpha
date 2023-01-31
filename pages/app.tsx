import { CheckCircleIcon, EmailIcon } from "@chakra-ui/icons";
import { Box, Text, Button, Center, Divider, Flex, Heading, Image, Stack, Icon, HStack, Link } from "@chakra-ui/react";
import { useState } from "react";
import MasteryChecklist from "../components/MasteryChecklist";
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { GrCycle } from "react-icons/gr";
import DayCycle from "../components/DayCycle";
import { GiCycle, GiMeditation, GiShinyApple, GiWeightLiftingUp } from "react-icons/gi";
import { BsJournalText } from "react-icons/bs";
import { MdOutlineForum } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import Head from "next/head";

export default function AppPage() {
    const allowList = ["0x6f32277C4c5Ae58EF634226E05fB47e1993C3cA2"];

    const CATEGORY_TIME = 0;
    const COMPONENT_MASTERY_CHECKLIST = 0;
    const COMPONENT_DAY_CYCLE = 1;

    const CATEGORY_MIND = 1;
    const COMPONENT_MEDITATE = 2;
    const COMPONENT_JOURNAL = 3;

    const CATEGORY_HEALTH = 2;
    const COMPONENT_DIET = 4;
    const COMPONENT_EXERCISE = 5;

    const CATEGORY_NETWORK = 6;
    const COMPONENT_NEWS_TICKER = 7;
    const COMPONENT_FORUM = 8;
    const COMPONENT_MEMBERS = 9;
    const COMPONENT_SOCIAL_MEDIA = 10;

    const [category, setCategory] = useState(CATEGORY_TIME);
    const [component, setComponent] = useState(COMPONENT_MASTERY_CHECKLIST);

    const { address, isConnected } = useAccount();
    const { data: ensName } = useEnsName({ address })
    const { connect } = useConnect({connector: new MetaMaskConnector()});
    const { disconnect } = useDisconnect();

    const hearts = ["💜", "💙", "💚", "💛"];
    const heartIndex = Math.floor(Math.random() * 4);

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

    function NotInAllowList() {
        return (
            <Center h="100vh" w="100vw" bg="gray.100" color="gray.800" flexDir="column">
                <Heading fontSize="6xl" fontStyle={"italic"} letterSpacing={"0.5rem"}>YOU ARE NOT A MEMBER</Heading>
                <Box py="2rem"/>
                <Link href="https://buy.stripe.com/cN27vv5Kl85b6TmfYY" target={"_blank"}>
                    <Button
                    size="lg" 
                    letterSpacing={"0.1rem"} 
                    rounded="full" 
                    variant="solid"
                    colorScheme={"blackAlpha"}>
                        <Text fontSize="2xl">BECOME A MEMBER</Text>
                    </Button>
                </Link>
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
        else if (category === CATEGORY_NETWORK) {
            return (
                <Stack spacing="2rem">
                    <Button 
                    onClick={() => setComponent(COMPONENT_FORUM)}
                    colorScheme='red'
                    variant={component === COMPONENT_FORUM ? 'solid' : 'ghost'}
                    size="lg"
                    rounded="full"
                    leftIcon={<Icon as={MdOutlineForum} boxSize="1.5rem" />}>
                        <Text fontSize="xl">Forum</Text>
                    </Button>
                    <Button
                    onClick={() => setComponent(COMPONENT_NEWS_TICKER)} 
                    colorScheme='red'
                    variant={component === COMPONENT_NEWS_TICKER ? 'solid' : 'ghost'}
                    size="lg"
                    rounded="full"
                    leftIcon={<Icon as={BiNews} boxSize="1.5rem" />}>
                        <Text fontSize="xl">News Ticker</Text>
                    </Button>
                    <Button
                    onClick={() => setComponent(COMPONENT_SOCIAL_MEDIA)} 
                    colorScheme='red'
                    variant={component === COMPONENT_SOCIAL_MEDIA ? 'solid' : 'ghost'}
                    size="lg"
                    rounded="full"
                    leftIcon={<Icon as={IoShareSocialSharp} boxSize="1.5rem" />}>
                        <Text fontSize="xl">Social Media</Text>
                    </Button>
                    <Button
                    onClick={() => setComponent(COMPONENT_MEMBERS)} 
                    colorScheme='red'
                    variant={component === COMPONENT_MEMBERS ? 'solid' : 'ghost'}
                    size="lg"
                    rounded="full"
                    leftIcon={<Icon as={FaUsers} boxSize="1.5rem" />}>
                        <Text fontSize="xl">Members</Text>
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
                return <MasteryChecklist address={address}/>;
            case COMPONENT_DAY_CYCLE:
                return <DayCycle/>;
            default:
                return <Text>Oops, something went wrong!</Text>;
        }
    }

    function Connected() {
        return (
            <Flex h="100vh" w="100vw" bg="gray.100" color="gray.800" overflow={"hidden"}>
                <Box w="25vw" bg="white">
                    <Center h="25vh" w="100%" py="1rem">
                        <Image src="/logo.png" alt="Logo" maxH="80%" />
                        <Center pl="1rem" flexDir="column">
                            <Heading fontSize="6xl" letterSpacing={"0.5rem"}>ALPHA</Heading>
                            <Text fontSize="xl" letterSpacing={"0.1rem"}>MASTER YOURSELF</Text>
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
                                <Button
                                onClick={() => setCategory(CATEGORY_NETWORK)}
                                size="sm" 
                                fontWeight={"bold"}  
                                rounded="full" 
                                colorScheme={"red"} 
                                variant={category === CATEGORY_NETWORK ? "solid" : "outline"}
                                w="6vw">
                                    NETWORK
                                </Button>
                            </HStack>
                        </Stack>
                    </Center>
                    <Divider/>
                    <Center h="45vh">
                        <CategoryComponents/>
                    </Center>
                    <Divider/>
                    <Center h="5vh">
                        <Link href="https://alexochs.de" target="_blank">
                            <Text fontSize="xs">Made with {hearts[heartIndex]} by Alex Ochs</Text>
                        </Link>
                    </Center>
                </Box>
                <Divider orientation="vertical" />
                <Box w="75vw" h="100vh" py="2rem" px="1rem" overflow={"scroll"}>
                    <Content/>
                </Box>
            </Flex>
        );
    }

    return (
        <>
            {isConnected ? (
                allowList.includes(address as string) ? <Connected/> : <NotInAllowList/>
            ) : 
            <NotConnected/>}
        </>
    );
}