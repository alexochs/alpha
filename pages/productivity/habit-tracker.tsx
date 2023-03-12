import { Center, Checkbox, Flex, Heading, Text, SimpleGrid, Input, VStack, HStack, Stack, TableContainer, Table, Tbody, Tr, Td, Button, Thead, Th } from "@chakra-ui/react";
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
        .from("habit-tracker")
        .select("*")
        .eq("profile_id", profileId);

    if (error) {
        console.log(error);
        return;
    }

    const habits = data;/*.map((task: any) => {
        return {
            id: task.id,
            date: task.date,
            name: task.name,
            difficulty: task.difficulty,
            importance: task.importance,
            completed: task.completed,
        };
    });*/

    console.log(habits);

    return {
        props: {
            profileId,
            initialHabits: habits,
        },
    };
}

export default function HabiTrackerPage({ profileId, initialHabits }: any) {
    const supabase = useSupabaseClient();

    const [habits, setHabits] = useState<any[]>(initialHabits);

    const [newHabitName, setNewHabitName] = useState("");
    const [invalidHabitName, setInvalidHabitName] = useState(false);

    const [newHabitDays, setNewHabitDays] = useState<string[]>([]);
    const [invalidHabitDays, setInvalidHabitDays] = useState(false);

    const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
    useEffect(() => {
        setDate(
            localStorage.getItem("date")
                ? new Date(localStorage.getItem("date")!)
                : new Date(new Date().setHours(0, 0, 0, 0))
        );
    }, [date]);

    function toggleDay(day: string) {
        if (newHabitDays.includes(day)) {
            setNewHabitDays(newHabitDays.filter((d) => d !== day));
        } else {
            setNewHabitDays([...newHabitDays, day]);
        }
    }

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
            setHabits(
                habits.map((h) => {
                    if (h.id === habit.id) {
                        h.completed = habit.completed;
                    }
                    return h;
                })
            );
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
            setNewHabitName("");
            setNewHabitDays([]);

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

        setHabits(data!);

        console.log(data);
        console.log(date.toISOString().split("T")[0]);
    }

    async function deleteHabit(habit: any) {
        const { data, error } = await supabase
            .from("habit-tracker")
            .delete()
            .eq("id", habit.id);

        if (error) {
            alert("Error deleting habit");
        } else {
            setHabits(habits.filter((h) => h.id !== habit.id));
        }
    }

    return (
        <Center ml="5vw" w="90vw" flexDir="column">
            <Stack spacing="1rem" w={["90vw", "35vw"]}>
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
                    <Text fontWeight={"bold"}>Repeat on</Text>

                    <SimpleGrid columns={2} spacing="1rem" alignContent={"space-evenly"} alignItems="space-evenly">
                        <HStack w="40vw">
                            <Text>Monday</Text>
                            <Checkbox
                                onChange={() => toggleDay("monday")}
                                isChecked={newHabitDays.includes("monday")}
                                isInvalid={invalidHabitDays}
                                colorScheme="yellow"
                                size="lg"
                            />
                        </HStack>

                        <HStack>
                            <Text >Tuesday</Text>
                            <Checkbox
                                onChange={() => toggleDay("tuesday")}
                                isChecked={newHabitDays.includes("tuesday")}
                                colorScheme="yellow"
                                size="lg"
                                isInvalid={invalidHabitDays}
                            />
                        </HStack>

                        <HStack>
                            <Text >Wednesday</Text>
                            <Checkbox
                                onChange={() => toggleDay("wednesday")}
                                isChecked={newHabitDays.includes(
                                    "wednesday"
                                )}
                                colorScheme="yellow"
                                size="lg"
                                isInvalid={invalidHabitDays}
                            />
                        </HStack>

                        <HStack>
                            <Text >Thursday</Text>
                            <Checkbox
                                onChange={() => toggleDay("thursday")}
                                isChecked={newHabitDays.includes(
                                    "thursday"
                                )}
                                colorScheme="yellow"
                                size="lg"
                                isInvalid={invalidHabitDays}
                            />
                        </HStack>

                        <HStack>
                            <Text >Friday</Text>
                            <Checkbox
                                onChange={() => toggleDay("friday")}
                                isChecked={newHabitDays.includes("friday")}
                                colorScheme="yellow"
                                size="lg"
                                isInvalid={invalidHabitDays}
                            />
                        </HStack>

                        <HStack>
                            <Text >Saturday</Text>
                            <Checkbox
                                onChange={() => toggleDay("saturday")}
                                isChecked={newHabitDays.includes(
                                    "saturday"
                                )}
                                colorScheme="yellow"
                                size="lg"
                                isInvalid={invalidHabitDays}
                            />
                        </HStack>

                        <HStack>
                            <Text >Sunday</Text>
                            <Checkbox
                                onChange={() => toggleDay("sunday")}
                                isChecked={newHabitDays.includes("sunday")}
                                colorScheme="yellow"
                                size="lg"
                                isInvalid={invalidHabitDays}
                            />
                        </HStack>
                    </SimpleGrid>

                    <Button
                        onClick={addNewHabit}
                        colorScheme="yellow"
                        rounded="full"
                        mt="1rem"
                    >
                        Make a new habit
                    </Button>
                </Flex>
            </Stack>

            <Stack spacing="1rem" pt="4rem">
                <Heading
                    fontSize={["4xl", "5xl"]}
                    fontWeight={"bold"}
                    letterSpacing="0.1rem"
                    textAlign={"center"}
                >
                    Today&apos;s Habits
                </Heading>
                {habits.filter((habit: any) =>
                    habit.days.includes(
                        date
                            .toLocaleDateString(
                                "en-US",
                                { weekday: "long" }
                            )
                            .toLowerCase()
                    )
                ).length === 0 ? <Text fontSize="lg" textAlign={"center"}>No habits for today!</Text> :
                    <TableContainer fontSize="xl" pb="4rem" maxW="100vw" minW={["100vw", "35vw"]}>
                        <Table variant="striped" colorScheme="blackAlpha">
                            <Thead>
                                <Tr>
                                    <Th>Habit</Th>
                                    <Th fontWeight={"bold"}>Done</Th>
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
                                                {/*<Td>{habit.name.length > 16 ? habit.name.slice(0, 16) + "..." : habit.name}</Td>*/}
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
                    </TableContainer>}
            </Stack>
        </Center>
    );
}