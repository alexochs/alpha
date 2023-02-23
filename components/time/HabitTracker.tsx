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
    TableContainer,
    Table,
    Tbody,
    Td,
    Tr,
    Thead,
    Th,
    VStack,
    SimpleGrid,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function HabitTracker({ profileId, date, isMobile }: any) {
    const supabase = useSupabaseClient();

    const [dateString, setDateString] = useState(
        date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        })
    );

    const [habits, setHabits] = useState<any[] | null>([]);

    const [newHabitName, setNewHabitName] = useState("");
    const [invalidHabitName, setInvalidHabitName] = useState(false);

    const [newHabitDays, setNewHabitDays] = useState<string[]>([]);
    const [invalidHabitDays, setInvalidHabitDays] = useState(false);

    function toggleDay(day: string) {
        if (newHabitDays.includes(day)) {
            setNewHabitDays(newHabitDays.filter((d) => d !== day));
        } else {
            setNewHabitDays([...newHabitDays, day]);
        }
    }
    async function addNewHabit() {
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

        const { data, error } = await supabase.from("habit-tracker").insert([
            {
                profile_id: profileId,
                name: newHabitName,
                days: newHabitDays,
                completed: [],
            },
        ]);

        if (error) {
            alert("Error creating new habit");
        } else {
            alert("New habit created successfully");

            setNewHabitName("");
            setNewHabitDays([
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
            ]);

            fetchHabits();
        }
    }

    async function fetchHabits() {
        const { data, error } = await supabase
            .from("habit-tracker")
            .select("*")
            .eq("profile_id", profileId);

        if (!data || error) {
            alert("Error fetching habits");
        }

        setHabits(data);

        console.log(data);
        console.log(date.toISOString().split("T")[0]);
    }

    useEffect(() => {
        fetchHabits();
    }, []);

    async function toggleHabitCompletion(habit: any) {
        const _date = date.toISOString().split("T")[0];
        if (habit.completed.includes(date.toISOString().split("T")[0])) {
            for (let i = 0; i < habit.completed.length; i++) {
                if (habit.completed[i] === _date) {
                    habit.completed.splice(i, 1);
                }
            }
        } else {
            habit.completed.push(_date);
        }

        const { data, error } = await supabase
            .from("habit-tracker")
            .update({
                completed: habit.completed,
            })
            .eq("id", habit.id);

        if (error) {
            alert("Error completing habit");
        } else {
            fetchHabits();
        }
    }

    async function deleteHabit(habit: any) {
        const { data, error } = await supabase
            .from("habit-tracker")
            .delete()
            .eq("id", habit.id);

        if (error) {
            alert("Error deleting habit");
        } else {
            fetchHabits();
        }
    }

    function Desktop() {
        return (
            <Stack w="75vw">
                <Center flexDir={"column"}>
                    <Stack spacing="2rem" pt="2rem">
                        <Text
                            fontSize={["3xl", "4xl"]}
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
                            Add to your habits
                        </Button>
                    </Stack>

                    <Stack spacing="1rem" pt="4rem">
                        <Text
                            fontSize={["4xl", "5xl"]}
                            fontWeight={"bold"}
                            letterSpacing="0.1rem"
                        >
                            Today&apos;s Habits
                        </Text>

                        <TableContainer fontSize="xl">
                            <Table variant="striped" colorScheme="blackAlpha">
                                <Thead>
                                    <Tr>
                                        <Th>Habit</Th>
                                        <Th isNumeric fontWeight={"bold"}>
                                            Done
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {habits &&
                                        habits
                                            .filter((habit: any) =>
                                                habit.days.includes(
                                                    date
                                                        .toLocaleDateString(
                                                            "en-US",
                                                            { weekday: "long" }
                                                        )
                                                        .toLowerCase()
                                                )
                                            )
                                            .sort(
                                                (a: any, b: any) => a.completed
                                            )
                                            .map((habit, index) => (
                                                <Tr key={index}>
                                                    <Td>{habit.name}</Td>
                                                    <Td>
                                                        <Checkbox
                                                            onChange={() =>
                                                                toggleHabitCompletion(
                                                                    habit
                                                                )
                                                            }
                                                            isChecked={habit.completed.includes(
                                                                date
                                                                    .toISOString()
                                                                    .split(
                                                                        "T"
                                                                    )[0]
                                                            )}
                                                            colorScheme="yellow"
                                                            size="lg"
                                                        />
                                                    </Td>
                                                    <Td>
                                                        <Button
                                                            onClick={() =>
                                                                deleteHabit(
                                                                    habit
                                                                )
                                                            }
                                                            colorScheme="red"
                                                            size="xs"
                                                            variant="ghost"
                                                            rounded="full"
                                                        >
                                                            x
                                                        </Button>
                                                    </Td>
                                                </Tr>
                                            ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Center>
            </Stack>
        );
    }

    function Mobile() {
        return (
            <Center ml="5vw" w="90vw" flexDir="column">
                <VStack spacing="1rem">
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
                            onChange={(e) => setNewHabitName(e.target.value)}
                            isInvalid={invalidHabitName}
                            variant="outline"
                            placeholder="Describe your new habit"
                            rounded="full"
                        />
                    </Flex>

                    <Flex flexDir="column">
                        <Text>Repeat on</Text>

                        <SimpleGrid columns={3} spacing="1rem">
                            <Center>
                                <Text fontSize="sm">Monday</Text>
                                <Checkbox
                                    onChange={() => toggleDay("monday")}
                                    isChecked={newHabitDays.includes("monday")}
                                    isInvalid={invalidHabitDays}
                                    colorScheme="yellow"
                                    size="lg"
                                />
                            </Center>

                            <Center>
                                <Text fontSize="sm">Tuesday</Text>
                                <Checkbox
                                    onChange={() => toggleDay("tuesday")}
                                    isChecked={newHabitDays.includes("tuesday")}
                                    colorScheme="yellow"
                                    size="lg"
                                    isInvalid={invalidHabitDays}
                                />
                            </Center>

                            <Center>
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
                            </Center>

                            <Center>
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
                            </Center>

                            <Center>
                                <Text fontSize="sm">Friday</Text>
                                <Checkbox
                                    onChange={() => toggleDay("friday")}
                                    isChecked={newHabitDays.includes("friday")}
                                    colorScheme="yellow"
                                    size="lg"
                                    isInvalid={invalidHabitDays}
                                />
                            </Center>

                            <Center>
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
                            </Center>

                            <Center>
                                <Text fontSize="sm">Sunday</Text>
                                <Checkbox
                                    onChange={() => toggleDay("sunday")}
                                    isChecked={newHabitDays.includes("sunday")}
                                    colorScheme="yellow"
                                    size="lg"
                                    isInvalid={invalidHabitDays}
                                />
                            </Center>
                        </SimpleGrid>
                    </Flex>
                </VStack>
            </Center>
        );
    }

    return isMobile ? Mobile() : Desktop();
}
