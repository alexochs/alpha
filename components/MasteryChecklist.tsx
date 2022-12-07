import { Box, Center, Flex, Heading, HStack, Text, Input, Select, Stack, Link, Button } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

export default function MasteryChecklist() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [newTaskName, setNewTaskName] = useState("");
    const [invalidTaskName, setInalidTaskName] = useState(false);
    const [newTaskDifficulty, setNewTaskDifficulty] = useState(1);
    const [newTaskImportance, setNewTaskImportance] = useState(1);

    function addTask() {
        if (!newTaskName) 
        {
            setInvalidTaskName(true);
            return;
        }
        const newTask = {
            name: newTaskName,
            difficulty: newTaskDifficulty,
            importance: newTaskImportance,
        };

        setTasks([...tasks, newTask]);

        setNewTaskName("");
        setNewTaskDifficulty(1);
        setNewTaskImportance(1);
    }

    function deleteTask(toDelete: number) {
        setTasks(tasks.filter((task, index) => index !== toDelete));
    }

    return (
        <Stack>
            <Center flexDir={"column"}>
                <Heading fontSize="4xl" letterSpacing={"0.5rem"}>MASTER YOUR DAILY TASKS</Heading>
                <Flex>
                    <Text>Inspired by&nbsp;</Text>
                    <Link href="https://www.youtube.com/watch?v=0lacN9qwUCw" target="_blank" rel="noreferrer">
                        <Text>Luke Belmar&apos;s Mastery Checklist</Text>
                    </Link>
                </Flex>
                <Box py="2rem" />
                <Stack spacing="1rem">
                    <Text fontSize="3xl" fontWeight={"bold"} letterSpacing="0.1rem">Set your tasks</Text>
                    <HStack spacing="1rem">
                        <Flex flexDir="column">
                            <Text>Task</Text>
                            <Input
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                            isInvalid={invalidTaskName}
                            variant='outline'
                            placeholder='Another one'/>
                        </Flex>
                        <Flex flexDir="column">
                            <Center>
                                <Text>Difficulty&nbsp;</Text>
                                <Text fontSize="xs">(13 = easy)</Text>
                            </Center>
                            <Select
                            value={newTaskDifficulty}
                            onChange={(e) => setNewTaskDifficulty(parseInt(e.target.value))}>
                                <option value={1}>1</option>
                                <option value={3}>3</option>
                                <option value={5}>5</option>
                                <option value={8}>8</option>
                                <option value={13}>13</option>
                            </Select>
                        </Flex>
                        <Flex flexDir="column">
                            <Center>
                                <Text>Importance&nbsp;</Text>
                                <Text fontSize="xs">(13 = high)</Text>
                            </Center>
                            <Select
                            value={newTaskImportance}
                            onChange={(e) => setNewTaskImportance(parseInt(e.target.value))}>
                                <option value={1}>1</option>
                                <option value={3}>3</option>
                                <option value={5}>5</option>
                                <option value={8}>8</option>
                                <option value={13}>13</option>
                            </Select>
                        </Flex>
                    </HStack>
                    <Button
                    onClick={addTask}
                    colorScheme="yellow">
                        Add Task
                    </Button>
                </Stack>
                <Box py="2rem" />
                <Stack spacing="1rem">
                    <Text fontSize="3xl" fontWeight={"bold"} letterSpacing="0.1rem">Today&apos;s Mastery Checklist</Text>
                    {tasks.sort((a: any, b: any) => (b.difficulty + b.importance) - (a.difficulty + a.importance)).map((task, index) => (
                        <HStack key={index} spacing="1rem" justify={"space-around"}>
                            <Text>{task.name}</Text>
                            <Text>{task.difficulty}</Text>
                            <Text>{task.importance}</Text>
                            <Text fontWeight={"bold"}>{task.difficulty + task.importance}</Text>
                            <Button
                            onClick={() => deleteTask(index)}
                            colorScheme={"red"}
                            size="xs" 
                            variant="ghost"
                            rounded="full">
                                Delete
                            </Button>
                        </HStack>
                    ))}
                </Stack>
            </Center>
        </Stack>
    );
}