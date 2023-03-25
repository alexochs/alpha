import { Center, Checkbox, Flex, Heading, Text, SimpleGrid, Input, VStack, HStack, Stack, TableContainer, Table, Tbody, Tr, Td, Button, Thead, Th, Box, useDisclosure, Icon, IconButton, useMediaQuery } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { FaPlus, FaPlusCircle, FaQuestionCircle } from "react-icons/fa";
import CreateHabitModal from "../../components/Modals/CreateHabitModal";
import HabitTrackerHelpModal from "../../components/Modals/HabitTrackerHelpModal";

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

    return {
        props: {
            profileId,
            initialHabits: habits,
        },
    };
}

export default function HabitTrackerPage({ profileId, initialHabits }: any) {
    const isMobile = useMediaQuery("(max-width: 768px)")[0];
    const supabase = useSupabaseClient();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: helpIsOpen, onOpen: helpOnOpen, onClose: helpOnClose } = useDisclosure();

    const [habits, setHabits] = useState<any[]>(initialHabits);
    const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

    useEffect(() => {
        setDate(
            localStorage.getItem("date")
                ? new Date(localStorage.getItem("date")!)
                : new Date(new Date().setHours(0, 0, 0, 0))
        );
    }, [date]);

    async function toggleHabitCompletion(habit: any) {
        const _date = date.toISOString().split("T")[0];
        console.log(date);
        if (habit.completed.includes(_date)) {
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
                habits.map((h: any) => {
                    if (h.id === habit.id) {
                        h.completed = habit.completed;
                    }
                    return h;
                })
            );
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
            setHabits(habits.filter((h: any) => h.id !== habit.id));
        }
    }

    return (
        <Box>
            <Stack spacing="1rem">
                <Center>
                    <Text
                        fontSize={["4xl", "5xl"]}
                        fontWeight={"bold"}
                        letterSpacing="0.1rem"
                        textAlign={"center"}
                    >
                        Habit Tracker
                    </Text>
                    <IconButton
                        ml="1rem"
                        aria-label="help"
                        icon={<FaQuestionCircle size="1.5rem" />}
                        onClick={helpOnOpen}
                        rounded="full"
                    />
                </Center>

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
                    <Center>
                        <TableContainer fontSize="xl" pb="4rem" maxW={["100vw", "50vw"]} minW={["100vw", "35vw"]}>
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
                                                            borderColor="blackAlpha.500"
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
                    </Center>}
            </Stack>

            <HStack
                position="fixed"
                bottom={["5rem", "2rem"]}
                right={["1rem", "2rem"]}
            >
                {isMobile ?
                    <IconButton
                        aria-label="help"
                        icon={<FaPlus color="#333333" size="2.5rem" />}
                        onClick={onOpen}
                        h="4rem"
                        w="4rem"
                        rounded="full"
                        colorScheme={"yellow"}
                    /> :
                    <Button
                        onClick={onOpen}
                        colorScheme="yellow"
                        w={"12rem"}
                        h="4rem"
                        rounded="full"
                    >
                        <Center fontSize="2xl">
                            <Icon as={FaPlusCircle} mr=".5rem" />
                            <Text>New Habit</Text>
                        </Center>
                    </Button>}
            </HStack>

            <CreateHabitModal
                profileId={profileId}
                habits={habits}
                setHabits={setHabits}
                date={date}
                isOpen={isOpen}
                onClose={onClose}
            />

            <HabitTrackerHelpModal isOpen={helpIsOpen} onClose={helpOnClose} />
        </Box>
    );
}