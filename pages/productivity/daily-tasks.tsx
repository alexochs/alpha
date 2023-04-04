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
    useMediaQuery,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    Tooltip,
    SliderThumb,
    useDisclosure,
    Icon,
    IconButton,
} from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useContext, useEffect, useState } from "react";
import { FaPlus, FaPlusCircle, FaQuestionCircle } from "react-icons/fa";
import CreateTaskModal from "../../components/Modals/CreateTaskModal";
import DailyTasksHelpModal from "../../components/Modals/DailyTasksHelpModal";

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
        .from("mastery-checklist")
        .select("*")
        .eq("profile_id", profileId);

    if (error) {
        console.log(error);
        return;
    }

    const tasks = data.map((task: any) => {
        return {
            id: task.id,
            date: task.date,
            name: task.name,
            difficulty: task.difficulty,
            importance: task.importance,
            completed: task.completed,
        };
    });

    return {
        props: {
            profileId,
            initialTasks: tasks,
        },
    };
}

export default function DailyTasksPage({ profileId, initialTasks }: any) {
    const supabase = useSupabaseClient();
    const isMobile = useMediaQuery("(max-width: 768px)")[0];
    const [tasks, setTasks] = useState<any[]>(initialTasks);

    const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
    useEffect(() => {
        setDate(
            localStorage.getItem("date")
                ? new Date(localStorage.getItem("date")!)
                : new Date(new Date().setHours(0, 0, 0, 0))
        );
    }, [date]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: helpIsOpen, onOpen: helpOnOpen, onClose: helpOnClose } = useDisclosure();

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

    async function updateTaskCompletion(task: any) {
        const { error } = await supabase
            .from('mastery-checklist')
            .update([{
                completed: !task.completed,
            }])
            .eq('id', task.id);

        if (error) {
            alert("Failed to update task :(");
            console.error(error);
            return;
        }

        await readTasks();
    }

    async function deleteTask(taskId: number) {
        const { error } = await supabase
            .from('mastery-checklist')
            .delete()
            .eq('id', taskId);

        if (error) {
            alert("Failed to delete task :(");
            console.error(error);
            return;
        }

        await readTasks();
        //setTasks(tasks.filter((task) => task.id !== toDelete));
    }

    return (
        <Center>
            <Stack>
                <Stack spacing="1rem" minW="65vw" maxW={"100vw"}>
                    <Center>
                        <Text
                            fontSize={["4xl", "5xl"]}
                            fontWeight={"bold"}
                            letterSpacing="0.1rem"
                            textAlign={"center"}
                        >
                            Daily Tasks
                        </Text>
                        <IconButton
                            ml="1rem"
                            aria-label="help"
                            icon={<FaQuestionCircle size="1.5rem" />}
                            onClick={helpOnOpen}
                            rounded="full"
                        />
                    </Center>

                    {tasks.filter(
                        (task: any) => task.date === date.getTime() - 1000 * 60 * date.getTimezoneOffset()
                    ).length < 1 ? (
                        <Text fontSize="xl" textAlign={"center"}>
                            No tasks for today yet!
                        </Text>
                    ) : (
                        <TableContainer fontSize="xl">
                            <Table
                                variant="striped"
                                colorScheme="blackAlpha"
                                size="lg"
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
                                            Done
                                        </Th>
                                        <Th />
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {tasks
                                        .filter(
                                            (task: any) =>
                                                task.date === date.getTime() - 1000 * 60 * date.getTimezoneOffset()
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
                                                        borderColor="blackAlpha.500"
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
                    )}
                </Stack>
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
                            <Text>New Task</Text>
                        </Center>
                    </Button>}
            </HStack>

            <CreateTaskModal
                profileId={profileId}
                tasks={tasks}
                setTasks={setTasks}
                date={date}
                isOpen={isOpen}
                onClose={onClose}
            />

            <DailyTasksHelpModal isOpen={helpIsOpen} onClose={helpOnClose} />
        </Center >
    );
}
