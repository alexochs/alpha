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
            <ModalContent rounded="3xl">
                <ModalHeader>Make a new habit</ModalHeader>
                <ModalCloseButton rounded="full" />
                <ModalBody>
                    <Stack spacing="1rem">
                        <Flex flexDir="column">
                            <Text>Habit</Text>
                            <Input
                                value={newHabitName}
                                onChange={(e) => setNewHabitName(e.target.value)}
                                isInvalid={invalidHabitName}
                                isDisabled={isLoading}
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
                                        isDisabled={isLoading}
                                        colorScheme="yellow"
                                        size="lg"
                                    />
                                </HStack>

                                <HStack>
                                    <Text>Tuesday</Text>
                                    <Checkbox
                                        onChange={() => toggleDay("tuesday")}
                                        isChecked={newHabitDays.includes("tuesday")}
                                        colorScheme="yellow"
                                        isDisabled={isLoading}
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
                                        isDisabled={isLoading}
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
                                        isDisabled={isLoading}
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
                                        isDisabled={isLoading}
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
                                        isDisabled={isLoading}
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
                                        isDisabled={isLoading}
                                        isInvalid={invalidHabitDays}
                                    />
                                </HStack>
                            </SimpleGrid>
                        </Flex>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button
                        onClick={async () => {
                            await addNewHabit();
                            onClose();
                        }}
                        isLoading={isLoading}
                        colorScheme="yellow"
                        rounded="full"
                        mt="1rem"
                    >
                        Add habit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}