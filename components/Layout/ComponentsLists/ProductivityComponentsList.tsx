import { CheckCircleIcon } from "@chakra-ui/icons";
import { Button, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiFillYoutube } from "react-icons/ai";
import { GiCycle, GiDividedSpiral, GiTomato } from "react-icons/gi";

export default function ProductivityComponentsList({ onClose }: any) {
    const router = useRouter();

    return (
        <Stack spacing="2rem">
            <Button
                onClick={() => {
                    window.location.href = "/productivity/daily-tasks";
                    onClose();
                }}
                colorScheme="yellow"
                variant={
                    router.asPath.includes("/daily-tasks") ? "solid" : "ghost"
                }
                size={["md", "lg"]}
                rounded="full"
                leftIcon={<CheckCircleIcon boxSize="1.5rem" />}
            >
                <Text fontSize="xl">Daily Tasks</Text>
            </Button>

            <Button
                onClick={() => {
                    window.location.href = "/productivity/habit-tracker";
                    onClose();
                }}
                colorScheme="yellow"
                variant={
                    router.asPath.includes("/habit-tracker") ? "solid" : "ghost"
                }
                size={["md", "lg"]}
                rounded="full"
                leftIcon={<Icon as={GiCycle} boxSize="1.5rem" />}
            >
                <Text fontSize="xl">Habit Tracker</Text>
            </Button>

            <Button
                onClick={() => {
                    window.location.href = "/productivity/deep-work";
                    onClose();
                }}
                colorScheme="yellow"
                variant={
                    router.asPath.includes("/deep-work") ? "solid" : "ghost"
                }
                size={["md", "lg"]}
                rounded="full"
                leftIcon={<Icon as={GiDividedSpiral} boxSize="1.5rem" />}
            >
                <Text fontSize="xl">Deep Work</Text>
            </Button>

            <Link href="https://lazywatch.app" target="_blank" style={{ textDecoration: "none" }}>
                <Button
                    colorScheme="yellow"
                    variant={
                        router.asPath.includes("/lazywatch") ? "solid" : "ghost"
                    }
                    size={["md", "lg"]}
                    rounded="full"
                    leftIcon={<Icon as={AiFillYoutube} boxSize="1.5rem" />}
                >
                    <Text fontSize="xl">LazyWatch</Text>
                </Button>
            </Link>
        </Stack>
    );
}
