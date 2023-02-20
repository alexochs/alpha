import {
    Box,
    Center,
    Flex,
    Heading,
    HStack,
    Text,
    Input,
    Select,
    Stack,
    Link,
    Button,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Checkbox,
    Divider,
    VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

export default function MasteryChecklist({ profileId, date, isMobile }: any) {
    const [tasks, setTasks] = useState<any[]>([]);

    const [newTaskName, setNewTaskName] = useState("");
    const [invalidTaskName, setInvalidTaskName] = useState(false);

    const [newTaskDifficulty, setNewTaskDifficulty] = useState(1);
    const [newTaskImportance, setNewTaskImportance] = useState(1);

    useEffect(() => {
        readTasks();
    }, []);

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

        const res = await fetch(
            `/api/mastery-checklist/create-task?profileId=${profileId}&date=${date.getTime()}&name=${
                newTask.name
            }&difficulty=${newTask.difficulty}&importance=${
                newTask.importance
            }&completed=${newTask.completed}`
        );
        const data = await res.json();

        if (!data || !data.success) {
            alert("Failed to add task");
            return;
        }

        setInvalidTaskName(false);
        //setTasks([...tasks, newTask]);

        setNewTaskName("");
        setNewTaskDifficulty(1);
        setNewTaskImportance(1);

        await readTasks();
    }

    async function readTasks() {
        const res = await fetch(
            `/api/mastery-checklist/read-tasks?profileId=${profileId}`
        );
        const data = await res.json();

        if (!data) {
            alert("Failed to get tasks by address");
            return;
        }

        console.log(data);
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

    async function updateTaskCompletion(task: any) {
        const res = await fetch(
            `/api/mastery-checklist/update-task?taskId=${
                task.id
            }&completed=${!task.completed}`
        );
        const data = await res.json();

        if (!data || !data.success) {
            alert("Failed to update task");
            return;
        }

        await readTasks();
    }

    async function deleteTask(taskId: number) {
        const res = await fetch(
            `/api/mastery-checklist/remove-task?taskId=${taskId}`
        );
        const data = await res.json();

        if (!data || !data.success) {
            alert("Failed to remove task");
            return;
        }

        await readTasks();
        //setTasks(tasks.filter((task) => task.id !== toDelete));
    }

    function Desktop() {
        return (
            <Center>
                <Stack>
                    <Center flexDir={"column"}>
                        <Heading fontSize="4xl" letterSpacing={"0.5rem"}>
                            MASTER YOUR DAILY TASKS
                        </Heading>

                        <Flex>
                            <Text>Inspired by&nbsp;</Text>
                            <Link
                                href="https://www.youtube.com/watch?v=0lacN9qwUCw"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Text>
                                    Luke Belmar&apos;s Mastery Checklist
                                </Text>
                            </Link>
                        </Flex>

                        <Box py="2rem" />

                        <Stack spacing="1rem">
                            <Text
                                fontSize="3xl"
                                fontWeight={"bold"}
                                letterSpacing="0.1rem"
                            >
                                Create a task
                            </Text>
                            <Stack spacing="1rem" w={["24rem", "32rem"]}>
                                <Flex flexDir="column">
                                    <Text>Task</Text>
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
                                </Flex>
                                <HStack spacing="1rem">
                                    <Flex flexDir="column" w="16rem">
                                        <Center>
                                            <Text>Difficulty&nbsp;</Text>
                                        </Center>
                                        <Select
                                            value={newTaskDifficulty}
                                            onChange={(e) =>
                                                setNewTaskDifficulty(
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            rounded="full"
                                        >
                                            <option value={1}>1</option>
                                            <option value={3}>3</option>
                                            <option value={5}>5</option>
                                            <option value={8}>8</option>
                                            <option value={13}>13</option>
                                        </Select>
                                    </Flex>

                                    <Flex flexDir="column" w="16rem">
                                        <Center>
                                            <Text>Importance&nbsp;</Text>
                                        </Center>
                                        <Select
                                            value={newTaskImportance}
                                            onChange={(e) =>
                                                setNewTaskImportance(
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            rounded="full"
                                        >
                                            <option value={1}>1</option>
                                            <option value={3}>3</option>
                                            <option value={5}>5</option>
                                            <option value={8}>8</option>
                                            <option value={13}>13</option>
                                        </Select>
                                    </Flex>
                                </HStack>
                            </Stack>
                            <Button
                                onClick={addTask}
                                colorScheme="yellow"
                                rounded="full"
                            >
                                Add task
                            </Button>
                        </Stack>

                        <Box py="2rem" />

                        <Stack spacing="1rem">
                            <Text
                                fontSize="3xl"
                                fontWeight={"bold"}
                                letterSpacing="0.1rem"
                            >
                                Mastery Checklist
                            </Text>
                            <TableContainer fontSize="xl">
                                <Table
                                    variant="striped"
                                    colorScheme="blackAlpha"
                                >
                                    <Thead>
                                        <Tr>
                                            <Th>Task</Th>
                                            <Th isNumeric>Difficulty</Th>
                                            <Th isNumeric>Importance</Th>
                                            <Th isNumeric fontWeight={"bold"}>
                                                Score
                                            </Th>
                                            <Th isNumeric fontWeight={"bold"}>
                                                Completed
                                            </Th>
                                            <Th />
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {tasks
                                            .filter(
                                                (task: any) =>
                                                    task.date === date.getTime()
                                            )
                                            .sort(
                                                (a: any, b: any) =>
                                                    b.difficulty +
                                                    b.importance -
                                                    (a.difficulty +
                                                        a.importance)
                                            )
                                            .map((task, index) => (
                                                <Tr key={index}>
                                                    <Td>{task.name}</Td>
                                                    <Td isNumeric>
                                                        {task.difficulty}
                                                    </Td>
                                                    <Td isNumeric>
                                                        {task.importance}
                                                    </Td>
                                                    <Td
                                                        isNumeric
                                                        fontWeight={"bold"}
                                                    >
                                                        {task.difficulty +
                                                            task.importance}
                                                    </Td>
                                                    <Td>
                                                        <Checkbox
                                                            onChange={() =>
                                                                updateTaskCompletion(
                                                                    task
                                                                )
                                                            }
                                                            isChecked={
                                                                task.completed
                                                            }
                                                            colorScheme="yellow"
                                                            size="lg"
                                                        />
                                                    </Td>
                                                    <Td>
                                                        <Button
                                                            onClick={() =>
                                                                deleteTask(
                                                                    task.id
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
            </Center>
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
                        Create a task
                    </Text>

                    <Flex flexDir="column">
                        <Text>Task</Text>
                        <Input
                            w="90vw"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                            isInvalid={invalidTaskName}
                            variant="outline"
                            placeholder="Describe your task"
                            rounded="full"
                        />
                    </Flex>

                    <HStack spacing="1rem" w="90vw">
                        <Flex flexDir="column" w="100%">
                            <Center>
                                <Text>Difficulty&nbsp;</Text>
                            </Center>
                            <Select
                                value={newTaskDifficulty}
                                onChange={(e) =>
                                    setNewTaskDifficulty(
                                        parseInt(e.target.value)
                                    )
                                }
                                rounded="full"
                            >
                                <option value={1}>1</option>
                                <option value={3}>3</option>
                                <option value={5}>5</option>
                                <option value={8}>8</option>
                                <option value={13}>13</option>
                            </Select>
                        </Flex>

                        <Flex flexDir="column" w="100%">
                            <Center>
                                <Text>Importance&nbsp;</Text>
                            </Center>
                            <Select
                                value={newTaskImportance}
                                onChange={(e) =>
                                    setNewTaskImportance(
                                        parseInt(e.target.value)
                                    )
                                }
                                rounded="full"
                            >
                                <option value={1}>1</option>
                                <option value={3}>3</option>
                                <option value={5}>5</option>
                                <option value={8}>8</option>
                                <option value={13}>13</option>
                            </Select>
                        </Flex>
                    </HStack>

                    <Button
                        w="90vw"
                        onClick={addTask}
                        colorScheme="yellow"
                        rounded="full"
                    >
                        Add task
                    </Button>
                </VStack>

                <VStack spacing="1rem" pt="4rem">
                    <Text
                        fontSize="3xl"
                        fontWeight={"bold"}
                        letterSpacing="0.1rem"
                    >
                        Mastery Checklist
                    </Text>

                    <Text>No tasks for today yet!</Text>
                </VStack>
            </Center>
        );
    }

    return isMobile ? <Mobile /> : <Desktop />;
}
