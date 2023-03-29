import { Button, Center, Checkbox, Flex, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Text, Tooltip } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function CreateTaskModal({ profileId, tasks, setTasks, date, isOpen, onClose }: any) {
    const supabase = useSupabaseClient();

    const [newTaskName, setNewTaskName] = useState("");
    const [invalidTaskName, setInvalidTaskName] = useState(false);

    const [newTaskDifficulty, setNewTaskDifficulty] = useState(5);
    const [showDifficultyTooltip, setShowDifficultyTooltip] = useState(false);

    const [newTaskImportance, setNewTaskImportance] = useState(5);
    const [showImportanceTooltip, setShowImportanceTooltip] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    async function addTask() {
        if (!newTaskName) {
            setInvalidTaskName(true);
            return;
        }

        const newTask = {
            id: null,
            date: date,
            name: newTaskName,
            difficulty: newTaskDifficulty,
            importance: newTaskImportance,
            completed: false,
        };

        setIsLoading(true);

        const { error } = await supabase.from("mastery-checklist").insert([
            {
                profile_id: profileId,
                date: date.getTime() - 1000 * 60 * date.getTimezoneOffset(),
                name: newTask.name,
                difficulty: newTask.difficulty,
                importance: newTask.importance,
                completed: newTask.completed,
            },
        ]);

        if (error) {
            alert("Failed to add task :(");
            console.error(error);
            return;
        }

        setInvalidTaskName(false);
        //setTasks([...tasks, newTask]);

        setNewTaskName("");
        setNewTaskDifficulty(5);
        setNewTaskImportance(5);

        await readTasks();
        setIsLoading(false);
    }

    async function readTasks() {
        const { data, error } = await supabase
            .from("mastery-checklist")
            .select("*")
            .eq("profile_id", profileId);

        if (error) {
            console.error(error);
            return;
        }

        setTasks(
            data.map((task: any) => {
                return {
                    id: task.id,
                    date: task.date,
                    name: task.name,
                    difficulty: task.difficulty,
                    importance: task.importance,
                    completed: task.completed,
                };
            })
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent rounded="3xl" w={["90vw", "50vw"]}>
                <ModalHeader>Make a new task for today</ModalHeader>
                <ModalCloseButton rounded="full" />

                <ModalBody>
                    <Stack spacing="1rem">
                        <Input
                            value={newTaskName}
                            onChange={(e) =>
                                setNewTaskName(e.target.value)
                            }
                            isInvalid={invalidTaskName}
                            variant="outline"
                            placeholder="Describe your task"
                            rounded="full"
                        />

                        <HStack spacing="1rem">
                            <Flex flexDir="column" w="50%">
                                <Center>
                                    <Text>Difficulty&nbsp;</Text>
                                </Center>

                                <Slider
                                    mt="1rem"
                                    id='slider'
                                    value={newTaskDifficulty}
                                    min={1}
                                    max={10}
                                    colorScheme='yellow'
                                    onChange={(v) => setNewTaskDifficulty(v)}
                                    onPointerEnter={() => setShowDifficultyTooltip(true)}
                                    onPointerLeave={() => setShowDifficultyTooltip(false)}
                                >
                                    <SliderTrack boxSize=".5rem" rounded="full">
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <Tooltip
                                        hasArrow
                                        bg='yellow.500'
                                        color='white'
                                        placement='top'
                                        isOpen={showDifficultyTooltip}
                                        label={newTaskDifficulty}
                                        rounded="lg"
                                    >
                                        <SliderThumb boxSize={"1.5rem"} />
                                    </Tooltip>
                                </Slider>
                            </Flex>

                            <Flex flexDir="column" w="50%">
                                <Center>
                                    <Text>Importance&nbsp;</Text>
                                </Center>

                                <Slider
                                    mt="1rem"
                                    id='slider'
                                    value={newTaskImportance}
                                    min={1}
                                    max={10}
                                    colorScheme='yellow'
                                    onChange={(v) => setNewTaskImportance(v)}
                                    onPointerEnter={() => setShowImportanceTooltip(true)}
                                    onPointerLeave={() => setShowImportanceTooltip(false)}
                                >
                                    <SliderTrack boxSize=".5rem" rounded="full">
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <Tooltip
                                        hasArrow
                                        bg='yellow.500'
                                        color='white'
                                        placement='top'
                                        isOpen={showImportanceTooltip}
                                        label={newTaskImportance}
                                        rounded="lg"
                                    >
                                        <SliderThumb boxSize={"1.5rem"} />
                                    </Tooltip>
                                </Slider>
                            </Flex>
                        </HStack>
                    </Stack>

                    <Button
                        onClick={async () => {
                            await addTask();
                            onClose();
                        }}
                        isLoading={isLoading}
                        colorScheme="yellow"
                        rounded="full"
                        mt="2rem"
                        w="100%"
                        mb="1rem"
                    >
                        Add task
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}