import { CheckCircleIcon } from "@chakra-ui/icons";
import { Button, Icon, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GiCycle } from "react-icons/gi";

export default function ProductivityComponentsList({ onClose }: any) {
    const router = useRouter();

    return (
        <Stack spacing="2rem">
            <Button
                onClick={() => {
                    router.push("/productivity/daily-tasks");
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
                <Text fontSize="xl">Mastery Checklist</Text>
            </Button>

            <Button
                onClick={() => {
                    router.push("/productivity/habit-tracker");
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
        </Stack>
    );
}
