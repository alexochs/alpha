import { Center, Checkbox, Flex, Heading, Text, SimpleGrid, Input, VStack, HStack, Stack, TableContainer, Table, Tbody, Tr, Td, Button, Thead, Th, Box, useDisclosure, Icon, IconButton, useMediaQuery, Spacer } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { FaEdit, FaPen, FaPlus, FaPlusCircle, FaQuestionCircle, FaTrash } from "react-icons/fa";
import CreateHabitModal from "../../components/Modals/CreateHabitModal";
import HabitTrackerHelpModal from "../../components/Modals/HabitTrackerHelpModal";
import HabitDetailModal from "../../components/Modals/HabitDetailModal";

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
    const { isOpen: detailIsOpen, onOpen: detailOnOpen, onClose: detailOnClose } = useDisclosure();
    const { isOpen: helpIsOpen, onOpen: helpOnOpen, onClose: helpOnClose } = useDisclosure();

    const [habits, setHabits] = useState<any[]>(initialHabits);
    const [selectedHabit, setSelectedHabit] = useState<any>(null);
    const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

    useEffect(() => {
        setDate(
            localStorage.getItem("date")
                ? new Date(localStorage.getItem("date")!)
                : new Date(new Date().setHours(0, 0, 0, 0))
        );
    }, [date]);

    async function toggleHabitCompletion(habit: any) {
        const _date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toISOString().split("T")[0];
        console.log(_date);
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
                {/*<Center>
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
    </Center>*/}

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
                    <Stack alignSelf={"center"} spacing="1rem" pb="4rem">
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
                                    <Flex
                                        key={index}
                                        w={["90vw", "35vw"]}
                                        bg="gray.200"
                                        p="1rem"
                                        rounded="3xl"
                                        _hover={{ bg: "gray.300" }}
                                        cursor={"pointer"}
                                    >
                                        <Box textAlign={"start"}>
                                            <Box
                                                onClick={() => {
                                                    setSelectedHabit(habit);
                                                    detailOnOpen();
                                                }}
                                                w="35vw"
                                            >
                                                <Heading fontSize={["4xl", "5xl"]}>{habit.name}</Heading>

                                                <Text fontSize={["2xl", "3xl"]}>{(parseInt(habit.timestamp.slice(0, 2)) - date.getTimezoneOffset() / 60) + ":" + habit.timestamp.slice(3, 5)}</Text>
                                            </Box>

                                            <HStack pt="1rem" spacing="1rem" fontSize="4xl">
                                                {[6, 5, 4, 3, 2, 1].map((i) =>
                                                    <Checkbox
                                                        key={i}
                                                        isDisabled={true}
                                                        isChecked={habit.completed.includes(
                                                            new Date(date.getTime() - i * 24 * 60 * 60 * 1000 - date.getTimezoneOffset() * 60 * 1000).toISOString().split("T")[0]
                                                        )}
                                                        colorScheme="yellow"
                                                        size={["mobilexl", "xl"]}
                                                        borderColor="blackAlpha.500"
                                                    />
                                                )}

                                                <Checkbox
                                                    onChange={(e) => {
                                                        toggleHabitCompletion(habit);
                                                        e.stopPropagation();
                                                    }}
                                                    isChecked={habit.completed.includes(
                                                        new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toISOString().split("T")[0]
                                                    )}
                                                    colorScheme="yellow"
                                                    size={["mobilexl", "xl"]}
                                                    borderColor="blackAlpha.500"
                                                />
                                            </HStack>
                                        </Box>
                                    </Flex>
                                ))}
                    </Stack>}
            </Stack>

            <HStack
                position="fixed"
                bottom={["6rem", "2rem"]}
                right={["1rem", "2rem"]}
            >
                {isMobile ?
                    <IconButton
                        aria-label="help"
                        icon={<FaPlus color="#555555" size="2.5rem" />}
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

            <HabitDetailModal
                profileId={profileId}
                habit={selectedHabit}
                habits={habits}
                setHabits={setHabits}
                date={date}
                isOpen={detailIsOpen}
                onClose={detailOnClose}
            />

            <HabitTrackerHelpModal isOpen={helpIsOpen} onClose={helpOnClose} />
        </Box>
    );
}