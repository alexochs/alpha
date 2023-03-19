import { Button, Checkbox, Flex, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function CreateHabitModal({ profileId, habits, setHabits, date, isOpen, onClose }: any) {
    const supabase = useSupabaseClient();

    const [newHabitName, setNewHabitName] = useState("");
    const [invalidHabitName, setInvalidHabitName] = useState(false);

    const [newHabitDays, setNewHabitDays] = useState<string[]>([]);
    const [invalidHabitDays, setInvalidHabitDays] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

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

        setIsLoading(true);

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

            await fetchHabits();
            setIsLoading(false);
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

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent rounded="3xl" w={["90vw", "50vw"]}>
                <ModalHeader>Make a new habit</ModalHeader>
                <ModalCloseButton rounded="full" />
                <ModalBody>
                    <Stack spacing="1rem">
                        <Input
                            value={newHabitName}
                            onChange={(e) => setNewHabitName(e.target.value)}
                            isInvalid={invalidHabitName}
                            isDisabled={isLoading}
                            variant="outline"
                            placeholder="Describe your new habit"
                            rounded="full"
                        />

                        <Button
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

                    <Button
                        onClick={async () => {
                            await addNewHabit();
                            onClose();
                        }}
                        isLoading={isLoading}
                        colorScheme="yellow"
                        rounded="full"
                        mt="2rem"
                        mb="1rem"
                        w="100%"
                    >
                        Add habit
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}