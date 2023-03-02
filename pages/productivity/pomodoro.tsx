import { Box, Button, Center, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, VStack } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export async function getServerSideProps(context: any) {
    const supabase = createServerSupabaseClient(context);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return {
            redirect: {
                destination: "/sign-in",
                permanent: false,
            },
        };
    }

    const profileId = session.user.id;

    const { data, error } = await supabase
        .from("pomodoro-timer")
        .select("*")
        .eq("profile_id", profileId);

    if (error) {
        console.log(error);
        return;
    }

    const { data: historyData, error: historyError } = await supabase
        .from("pomodoro-history")
        .select("*")
        .eq("profile_id", profileId);

    if (historyError) {
        console.log(historyError);
        return;
    }

    return {
        props: {
            profileId,
            initialTimer: data.length > 0 ? data[0] : null,
            initialHistory: historyData.length > 0 ? historyData : []
        },
    };
}

export default function PomodoroPage({ profileId, initialTimer, initialHistory }: any) {
    const supabase = useSupabaseClient();

    const { isOpen: startFocusIsOpen, onOpen: startFocusOnOpen, onClose: startFocusOnClose } = useDisclosure();
    const { isOpen: startBreakIsOpen, onOpen: startBreakOnOpen, onClose: startBreakOnClose } = useDisclosure();

    const [history, setHistory] = useState(initialHistory);
    const [timer, setTimer] = useState(initialTimer);
    const [timeString, setTimeString] = useState("00:00");
    const [startFocusDuration, setStartFocusDuration] = useState(45);
    const [startBreakDuration, setStartBreakDuration] = useState(10);

    async function startTimer(mode: number, duration: number) {
        const start = new Date();
        const end = new Date(start.getTime() + duration * 60000);

        const newTimer = {
            ...timer,
            profile_id: profileId,
            mode,
            start,
            end,
            active: true
        };
        console.log(newTimer);
        setTimer(newTimer);

        const res = await supabase
            .from("pomodoro-timer")
            .upsert(newTimer);

        console.log(res);

        if (res.status !== 201) {
            alert("Error starting timer");
            return;
        }

        startFocusOnClose();
        startBreakOnClose();
    }

    async function endTimer() {
        const newTimer = { ...timer, active: false }

        const timerRes = await supabase
            .from("pomodoro-timer")
            .upsert(newTimer);

        if (timerRes.status !== 201) {
            alert("Error ending timer");
        }

        setTimer(newTimer);

        const newSession = {
            profile_id: profileId,
            mode: timer.mode,
            start: timer.start,
            end: new Date()
        };

        const historyRes = await supabase
            .from("pomodoro-history")
            .insert(newSession)
            .single();

        console.log(historyRes);
        if (historyRes.status !== 201) {
            alert("Error adding session to history");
        }

        setHistory([...history, newSession].sort(
            (a: any, b: any) => a.start < b.start ? -1 : 1
        ));
    }

    function calculateTimeString() {
        if (!timer || !timer.active) {
            setTimeString("00:00");
            return;
        }

        const now = new Date();
        const end = new Date(timer.end);
        const timeLeft = end.getTime() - now.getTime();

        let minutes = Math.floor(timeLeft / 60000);
        let seconds = Math.floor((timeLeft % 60000) / 1000);

        if (timeLeft < 0) {
            minutes = (minutes + 1) * -1;
            seconds = (seconds + 1) * -1;
        }

        setTimeString(`${timeLeft < 0 ? "+" : ""}${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    }

    function calculateDurationString(_start: number, _end: number) {
        const start = new Date(_start).getTime();
        const end = new Date(_end).getTime();

        const minutes = Math.floor((end - start) / 60000);
        let seconds = Math.floor(((end - start) % 60000) / 1000);

        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            calculateTimeString();
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, history]);

    return (
        <>
            <Center flexDir={"column"}>
                <VStack
                    p="1rem"
                    border="2px"
                    rounded="3xl"
                    flexDir="column"
                    spacing="1rem"
                    w={["90vw", "25vw"]}
                >
                    <Text fontSize={["3xl", "4xl"]}>
                        {!timer || !timer.active ? "Start a session" : timer.mode == 0 ? "Focus" : "Relax"}
                    </Text>

                    <Text fontSize={["8xl", "8xl"]}>
                        {timeString}
                    </Text>

                    {timer && timer.active ? (
                        <Button rounded="full" onClick={endTimer}>
                            End current session
                        </Button>
                    ) : (
                        <HStack spacing="1rem">
                            <Button onClick={startFocusOnOpen} rounded="full" colorScheme={"yellow"}>
                                Focus on work
                            </Button>

                            <Button onClick={startBreakOnOpen} rounded="full" colorScheme={"yellow"} variant="outline">
                                Take a break
                            </Button>
                        </HStack>
                    )}
                </VStack>

                <VStack pt="4rem">
                    <Heading
                        fontSize={["4xl", "5xl"]}
                        fontWeight={"bold"}
                        letterSpacing="0.1rem"
                        textAlign={"center"}
                    >
                        History
                    </Heading>

                    {!history || history.length === 0 ? <Text fontSize="lg" textAlign={"center"}>You haven&apos;t done any session yet 😧</Text> :
                        <TableContainer fontSize="xl" pb="4rem" maxW="100vw" minW={["100vw", "35vw"]}>
                            <Table variant="striped" colorScheme="blackAlpha">
                                <Thead>
                                    <Tr>
                                        <Th fontWeight={"bold"}>Session</Th>
                                        <Th>Start</Th>
                                        <Th>Duration</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {history.sort(
                                        (a: any, b: any) => a.start > b.start ? -1 : 1
                                    )
                                        .map((session: any, index: number) => (
                                            <Tr key={index}>
                                                <Td>{session.mode === 0 ? "Focus" : "Break"}</Td>
                                                <Td>{new Date(session.start).toLocaleDateString("en-US", {
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                })}</Td>
                                                <Td>{calculateDurationString(session.start, session.end)}</Td>
                                            </Tr>
                                        ))}
                                </Tbody>
                            </Table>
                        </TableContainer>}
                </VStack>
            </Center>

            <Modal isOpen={startFocusIsOpen} onClose={startFocusOnClose}>
                <ModalOverlay />
                <ModalContent rounded={"3xl"}>
                    <ModalHeader>Focus on your work</ModalHeader>
                    <ModalCloseButton rounded="full" />
                    <ModalBody>
                        <VStack spacing="1rem">
                            <Text>How long do you want to focus for?</Text>

                            <Button rounded="full" colorScheme={"yellow"} variant={startFocusDuration == 30 ? "outline" : "ghost"} onClick={() => setStartFocusDuration(30)}>
                                30 Minutes
                            </Button>

                            <Button rounded="full" colorScheme={"yellow"} variant={startFocusDuration == 45 ? "outline" : "ghost"} onClick={() => setStartFocusDuration(45)}>
                                45 Minutes
                            </Button>

                            <Button rounded="full" colorScheme={"yellow"} variant={startFocusDuration == 60 ? "outline" : "ghost"} onClick={() => setStartFocusDuration(60)}>
                                60 Minutes
                            </Button>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button rounded="full" colorScheme={"yellow"} onClick={() => startTimer(0, startFocusDuration)}>
                            Get to work
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={startBreakIsOpen} onClose={startBreakOnClose}>
                <ModalOverlay />
                <ModalContent rounded={"3xl"}>
                    <ModalHeader>Take a break</ModalHeader>
                    <ModalCloseButton rounded="full" />
                    <ModalBody>
                        <VStack spacing="1rem">
                            <Text>How long do you want to relax for?</Text>

                            <Button rounded="full" colorScheme={"yellow"} variant={startBreakDuration == 5 ? "outline" : "ghost"} onClick={() => setStartBreakDuration(5)}>
                                5 Minutes
                            </Button>

                            <Button rounded="full" colorScheme={"yellow"} variant={startBreakDuration == 10 ? "outline" : "ghost"} onClick={() => setStartBreakDuration(10)}>
                                10 Minutes
                            </Button>

                            <Button rounded="full" colorScheme={"yellow"} variant={startBreakDuration == 15 ? "outline" : "ghost"} onClick={() => setStartBreakDuration(15)}>
                                15 Minutes
                            </Button>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button rounded="full" colorScheme={"yellow"} onClick={() => startTimer(1, startBreakDuration)}>
                            Relax
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}