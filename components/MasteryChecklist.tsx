import { Box, Center, Flex, Heading, HStack, Text, Input, Select, Stack, Link, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Checkbox } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

export default function MasteryChecklist({address}: any) {
    const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
    const [dateString, setDateString] = useState(date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }));

    const [tasks, setTasks] = useState<any[]>([]);

    const [newTaskName, setNewTaskName] = useState("");
    const [invalidTaskName, setInvalidTaskName] = useState(false);

    const [newTaskDifficulty, setNewTaskDifficulty] = useState(1);
    const [newTaskImportance, setNewTaskImportance] = useState(1);

    useEffect(() => {
        readTasks();
    }, []);

    function today() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        setDate(today);
        setDateString(today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }));
    }

    function nextDay() {
        const next = new Date(date.getTime() + 86400000);
        next.setHours(0, 0, 0, 0);

        setDate(new Date(date.getTime() + 86400000));
        setDateString(new Date(date.getTime() + 86400000).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }));
    }

    function previousDay() {
        const prev = new Date(date.getTime() - 86400000);
        prev.setHours(0, 0, 0, 0);

        setDate(new Date(date.getTime() - 86400000));
        setDateString(new Date(date.getTime() - 86400000).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }));
    }

    async function addTask() {
        if (!newTaskName) 
        {
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

        const res = await fetch(`/api/mastery-checklist/create-task?address=${address}&date=${date.getTime()}&name=${newTask.name}&difficulty=${newTask.difficulty}&importance=${newTask.importance}&completed=${newTask.completed}`);
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
        const res = await fetch(`/api/mastery-checklist/read-tasks?address=${address}`);
        const data = await res.json();

        if (!data) {
            alert("Failed to get tasks by address");
            return;
        }

        console.log(data);
        setTasks(data.map((task: any) => {
            return {
                id: task.id,
                date: task.date,
                name: task.name,
                difficulty: task.difficulty,
                importance: task.importance,
                completed: task.completed,
            }
        }));
    }

    async function updateTaskCompletion(task: any) {
        const res = await fetch(`/api/mastery-checklist/update-task?taskId=${task.id}&completed=${!task.completed}`);
        const data = await res.json();

        if (!data || !data.success) {
            alert("Failed to update task");
            return;
        }

        await readTasks();
    }

    async function deleteTask(taskId: number) {
        const res = await fetch(`/api/mastery-checklist/remove-task?taskId=${taskId}`);
        const data = await res.json();

        if (!data || !data.success) {
            alert("Failed to remove task");
            return;
        }

        await readTasks();
        //setTasks(tasks.filter((task) => task.id !== toDelete));
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
                <HStack spacing="4rem">
                    <Stack spacing="1rem">
                        <Text fontSize="3xl" fontWeight={"bold"} letterSpacing="0.1rem">Date</Text>
                        <Stack spacing="0.5rem">
                            <Text width="16rem">{dateString}</Text>
                            <HStack spacing="1rem">
                                <Button onClick={previousDay}>
                                    {"<"}
                                </Button>
                                <Button onClick={today}>
                                    Today
                                </Button>
                                <Button onClick={nextDay}>
                                    {">"}
                                </Button>
                            </HStack>
                        </Stack>
                    </Stack>

                    <Stack spacing="1rem">
                        <Text fontSize="3xl" fontWeight={"bold"} letterSpacing="0.1rem">New task</Text>
                        <HStack spacing="1rem">
                            <Flex flexDir="column">
                                <Text>Task</Text>
                                <Input
                                value={newTaskName}
                                onChange={(e) => setNewTaskName(e.target.value)}
                                isInvalid={invalidTaskName}
                                variant='outline'
                                placeholder='Describe your task'/>
                            </Flex>
                            <Flex flexDir="column">
                                <Center>
                                    <Text>Difficulty&nbsp;</Text>
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
                </HStack>
                <Box py="2rem" />
                <Stack spacing="1rem">
                    <Text fontSize="3xl" fontWeight={"bold"} letterSpacing="0.1rem">Mastery Checklist</Text>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                            <Tr>
                                <Th>Task</Th>
                                <Th isNumeric>Difficulty</Th>
                                <Th isNumeric>Importance</Th>
                                <Th isNumeric fontWeight={"bold"}>Score</Th>
                                <Th isNumeric fontWeight={"bold"}>Completed</Th>
                                <Th/>
                            </Tr>
                            </Thead>
                            <Tbody>
                                {tasks.filter((task: any) => task.date === date.getTime()).sort((a: any, b: any) => (b.difficulty + b.importance) - (a.difficulty + a.importance)).map((task, index) => (
                                    <Tr key={index}>
                                        <Td>{task.name}</Td>
                                        <Td isNumeric>{task.difficulty}</Td>
                                        <Td isNumeric>{task.importance}</Td>
                                        <Td isNumeric fontWeight={"bold"}>{task.difficulty + task.importance}</Td>
                                        <Td>
                                            <Checkbox onChange={() => updateTaskCompletion(task)} isChecked={task.completed} colorScheme="yellow"/>
                                        </Td>
                                        <Td>
                                            <Button onClick={() => deleteTask(task.id)} colorScheme="red" size="xs" variant="ghost">
                                                Delete
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