import {
    Center,
    Text,
    Select,
    Button,
    Input,
    Flex,
    Heading,
    HStack,
    Stack,
    Checkbox,
    Box,
} from "@chakra-ui/react";
import { useState } from "react";

export default function HabitTracker() {
    const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
    const [dateString, setDateString] = useState(
        date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        })
    );

    const [newHabitName, setNewHabitName] = useState("");
    const [invalidHabitName, setInvalidHabitName] = useState(false);

    const [newHabitDays, setNewHabitDays] = useState<string[]>([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
    ]);
    const [invalidHabitDays, setInvalidHabitDays] = useState(false);

    function toggleDay(day: string) {
        if (newHabitDays.includes(day)) {
            setNewHabitDays(newHabitDays.filter((d) => d !== day));
        } else {
            setNewHabitDays([...newHabitDays, day]);
        }
    }

    function today() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        setDate(today);
        setDateString(
            today.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            })
        );
    }

    function nextDay() {
        const next = new Date(date.getTime() + 86400000);
        next.setHours(0, 0, 0, 0);

        setDate(new Date(date.getTime() + 86400000));
        setDateString(
            new Date(date.getTime() + 86400000).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            })
        );
    }

    function previousDay() {
        const prev = new Date(date.getTime() - 86400000);
        prev.setHours(0, 0, 0, 0);

        setDate(new Date(date.getTime() - 86400000));
        setDateString(
            new Date(date.getTime() - 86400000).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            })
        );
    }

    function addNewHabit() {
        if (!newHabitName) {
            setInvalidHabitName(true);
            return;
        }
        setInvalidHabitName(false);

        if (newHabitDays.length === 0) {
            setInvalidHabitDays(true);
            return;
        }
        setInvalidHabitDays(false);
    }

    return (
        <Stack>
            <Center flexDir={"column"}>
                <Heading fontSize="4xl" letterSpacing={"0.5rem"}>
                    TRACK YOUR HABITS
                </Heading>

                <HStack spacing="4rem" pt="4rem">
                    <Stack spacing="1rem">
                        <Text
                            fontSize="3xl"
                            fontWeight={"bold"}
                            letterSpacing="0.1rem"
                        >
                            Date
                        </Text>
                        <Stack spacing="0.5rem">
                            <Text width="16rem">{dateString}</Text>
                            <HStack spacing="1rem">
                                <Button onClick={previousDay} rounded="full">
                                    {"<"}
                                </Button>
                                <Button onClick={today} rounded="full">
                                    Today
                                </Button>
                                <Button onClick={nextDay} rounded="full">
                                    {">"}
                                </Button>
                            </HStack>
                        </Stack>
                    </Stack>

                    <Stack spacing="1rem">
                        <Text
                            fontSize="3xl"
                            fontWeight={"bold"}
                            letterSpacing="0.1rem"
                        >
                            Make a new habit
                        </Text>

                        <Flex flexDir="column">
                            <Text>Habit</Text>
                            <Input
                                value={newHabitName}
                                onChange={(e) =>
                                    setNewHabitName(e.target.value)
                                }
                                isInvalid={invalidHabitName}
                                variant="outline"
                                placeholder="Describe your new habit"
                                rounded="full"
                            />
                        </Flex>

                        <HStack spacing="1rem">
                            <Text>Repeat on</Text>

                            <Box>
                                <Text fontSize="sm">Monday</Text>
                                <Checkbox
                                    onChange={() => toggleDay("monday")}
                                    isChecked={newHabitDays.includes("monday")}
                                    isInvalid={invalidHabitDays}
                                    colorScheme="yellow"
                                    size="lg"
                                />
                            </Box>

                            <Box>
                                <Text fontSize="sm">Tuesday</Text>
                                <Checkbox
                                    onChange={() => toggleDay("tuesday")}
                                    isChecked={newHabitDays.includes("tuesday")}
                                    colorScheme="yellow"
                                    size="lg"
                                    isInvalid={invalidHabitDays}
                                />
                            </Box>

                            <Box>
                                <Text fontSize="sm">Wednesday</Text>
                                <Checkbox
                                    onChange={() => toggleDay("wednesday")}
                                    isChecked={newHabitDays.includes(
                                        "wednesday"
                                    )}
                                    colorScheme="yellow"
                                    size="lg"
                                    isInvalid={invalidHabitDays}
                                />
                            </Box>

                            <Box>
                                <Text fontSize="sm">Thursday</Text>
                                <Checkbox
                                    onChange={() => toggleDay("thursday")}
                                    isChecked={newHabitDays.includes(
                                        "thursday"
                                    )}
                                    colorScheme="yellow"
                                    size="lg"
                                    isInvalid={invalidHabitDays}
                                />
                            </Box>

                            <Box>
                                <Text fontSize="sm">Friday</Text>
                                <Checkbox
                                    onChange={() => toggleDay("friday")}
                                    isChecked={newHabitDays.includes("friday")}
                                    colorScheme="yellow"
                                    size="lg"
                                    isInvalid={invalidHabitDays}
                                />
                            </Box>

                            <Box>
                                <Text fontSize="sm">Saturday</Text>
                                <Checkbox
                                    onChange={() => toggleDay("saturday")}
                                    isChecked={newHabitDays.includes(
                                        "saturday"
                                    )}
                                    colorScheme="yellow"
                                    size="lg"
                                    isInvalid={invalidHabitDays}
                                />
                            </Box>

                            <Box>
                                <Text fontSize="sm">Sunday</Text>
                                <Checkbox
                                    onChange={() => toggleDay("sunday")}
                                    isChecked={newHabitDays.includes("sunday")}
                                    colorScheme="yellow"
                                    size="lg"
                                    isInvalid={invalidHabitDays}
                                />
                            </Box>
                        </HStack>

                        <Button
                            onClick={addNewHabit}
                            colorScheme="yellow"
                            rounded="full"
                        >
                            Add to your Habit
                        </Button>
                    </Stack>
                </HStack>
            </Center>
        </Stack>
    );
}
