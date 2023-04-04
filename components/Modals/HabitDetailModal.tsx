import { Button, Center, Checkbox, Flex, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function HabitDetailModal({ profileId, habit, habits, setHabits, date, isOpen, onClose }: any) {
    const supabase = useSupabaseClient();

    const [newHabitName, setNewHabitName] = useState(habit ? habit.name : "");
    const [invalidHabitName, setInvalidHabitName] = useState(false);

    const [newHabitDays, setNewHabitDays] = useState<string[]>(habit ? habit.days : []);
    const [invalidHabitDays, setInvalidHabitDays] = useState(false);

    const [timestampHours, setTimestampHours] = useState(habit ? parseInt(habit?.timestamp.slice(0, 2)) - new Date().getTimezoneOffset() / 60 : new Date().getHours());
    const [timestampMinutes, setTimestampMinutes] = useState(habit ? parseInt(habit?.timestamp.slice(3, 5)) : new Date().getMinutes());

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (habit) {
            setNewHabitName(habit.name);
            setNewHabitDays(habit.days);
            setTimestampHours(parseInt(habit.timestamp.slice(0, 2)) - new Date().getTimezoneOffset() / 60);
            setTimestampMinutes(parseInt(habit.timestamp.slice(3, 5)));
        }
    }, [habit]);

    function toggleDay(day: string) {
        if (newHabitDays.includes(day)) {
            setNewHabitDays(newHabitDays.filter((d) => d !== day));
        } else {
            setNewHabitDays([...newHabitDays, day]);
        }
    }

    async function updateHabit() {
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

        setIsLoading(true);

        const hoursUTC = timestampHours * 1 + new Date().getTimezoneOffset() * 1 / 60 * 1;

        const { data, error } = await supabase
            .from("habit-tracker")
            .update({
                name: newHabitName,
                days: newHabitDays,
                timestamp: `${hoursUTC}:${timestampMinutes}:00+00`,
            })
            .eq("id", habit.id);

        if (error) {
            alert("Error updating habit");
            console.error(error);
            setIsLoading(false);
        } else {
            setNewHabitName("");
            setNewHabitDays([]);

            await fetchHabits();
            setIsLoading(false);
            onClose();
        }
    }

    async function deleteHabit() {
        const { data, error } = await supabase
            .from("habit-tracker")
            .delete()
            .eq("id", habit.id);

        if (error) {
            alert("Error deleting habit");
        } else {
            setHabits(habits.filter((h: any) => h.id !== habit.id));
            onClose();
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
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent rounded="3xl" w={["90vw", "50vw"]}>
                <ModalHeader>Edit habit</ModalHeader>
                <ModalCloseButton rounded="full" />
                <ModalBody>
                    <Stack spacing="2rem" mb="1rem">
                        <Input
                            size="lg"
                            value={newHabitName}
                            onChange={(e) => setNewHabitName(e.target.value)}
                            isInvalid={invalidHabitName}
                            isDisabled={isLoading}
                            variant="outline"
                            placeholder="Describe your new habit"
                            rounded="full"
                        />

                        <Stack spacing="1rem">
                            <Button
                                size="lg"
                                onClick={() => {
                                    toggleDay("monday");
                                }}
                                variant={newHabitDays.includes("monday") ? "outline" : "ghost"}
                                isDisabled={isLoading}
                                rounded="full"
                                colorScheme={"yellow"}
                            >
                                Monday
                            </Button>

                            <Button
                                size="lg"
                                onClick={() => {
                                    toggleDay("tuesday");
                                }}
                                variant={newHabitDays.includes("tuesday") ? "outline" : "ghost"}
                                isDisabled={isLoading}
                                rounded="full"
                                colorScheme={"yellow"}
                            >
                                Tuesday
                            </Button>

                            <Button
                                size="lg"
                                onClick={() => {
                                    toggleDay("wednesday");
                                }}
                                variant={newHabitDays.includes("wednesday") ? "outline" : "ghost"}
                                isDisabled={isLoading}
                                rounded="full"
                                colorScheme={"yellow"}
                            >
                                Wednesday
                            </Button>

                            <Button
                                size="lg"
                                onClick={() => {
                                    toggleDay("thursday");
                                }}
                                variant={newHabitDays.includes("thursday") ? "outline" : "ghost"}
                                isDisabled={isLoading}
                                rounded="full"
                                colorScheme={"yellow"}
                            >
                                Thursday
                            </Button>

                            <Button
                                size="lg"
                                onClick={() => {
                                    toggleDay("friday");
                                }}
                                variant={newHabitDays.includes("friday") ? "outline" : "ghost"}
                                isDisabled={isLoading}
                                rounded="full"
                                colorScheme={"yellow"}
                            >
                                Friday
                            </Button>

                            <Button
                                size="lg"
                                onClick={() => {
                                    toggleDay("saturday");
                                }}
                                variant={newHabitDays.includes("saturday") ? "outline" : "ghost"}
                                isDisabled={isLoading}
                                rounded="full"
                                colorScheme={"yellow"}
                            >
                                Saturday
                            </Button>

                            <Button
                                size="lg"
                                onClick={() => {
                                    toggleDay("sunday");
                                }}
                                variant={newHabitDays.includes("sunday") ? "outline" : "ghost"}
                                isDisabled={isLoading}
                                rounded="full"
                                colorScheme={"yellow"}
                            >
                                Sunday
                            </Button>
                        </Stack>

                        <Center>
                            <HStack>
                                <Select w="6rem" colorScheme="yellow" rounded="full" borderColor="gray.500" size="lg" value={timestampHours} onChange={(e: any) => setTimestampHours(e.target.value)}>
                                    {Array.from(Array(24).keys()).map((i) => {
                                        return (
                                            <option value={i} key={i}>
                                                {i}
                                            </option>
                                        );
                                    })}
                                </Select>

                                <Text fontSize="lg" fontWeight="bold">:</Text>

                                <Select w="6rem" colorScheme="yellow" rounded="full" borderColor="gray.500" size="lg" value={timestampMinutes} onChange={(e: any) => setTimestampMinutes(e.target.value)}>
                                    {Array.from(Array(59).keys()).map((i) => {
                                        return (
                                            <option value={i} key={i}>
                                                {i}
                                            </option>
                                        );
                                    })}
                                </Select>
                            </HStack>
                        </Center>

                        <Stack spacing="1rem">
                            <Button
                                size="lg"
                                onClick={updateHabit}
                                isLoading={isLoading}
                                isDisabled={invalidHabitName || invalidHabitDays || isLoading}
                                colorScheme="yellow"
                                rounded="full"
                                w="100%"
                            >
                                Update habit
                            </Button>

                            <Button
                                size="lg"
                                onClick={deleteHabit}
                                isLoading={isLoading}
                                isDisabled={isLoading}
                                colorScheme="red"
                                variant={"ghost"}
                                rounded="full"
                                mb="1rem"
                                w="100%"
                            >
                                Delete habit
                            </Button>
                        </Stack>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}