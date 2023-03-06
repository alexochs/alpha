import { CheckCircleIcon } from "@chakra-ui/icons";
import { Button, Icon, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsJournalText } from "react-icons/bs";
import {
    GiCycle,
    GiMeditation,
    GiShinyApple,
    GiWeightLiftingUp,
} from "react-icons/gi";

export default function HealthComponentsList({ onClose }: any) {
    const router = useRouter();

    return (
        <Stack spacing="2rem">
            <Button
                isDisabled={true}
                //onClick={() => setComponent(COMPONENT_DIET)}
                colorScheme="green"
                variant={router.asPath.includes("/diet") ? "solid" : "ghost"}
                size={["md", "lg"]}
                rounded="full"
                leftIcon={<Icon as={GiShinyApple} boxSize="1.5rem" />}
            >
                <Text fontSize="xl">Diet</Text>
            </Button>
            <Button
                isDisabled={true}
                //onClick={() => setComponent(COMPONENT_EXERCISE)}
                colorScheme="green"
                variant={
                    router.asPath.includes("/exercise") ? "solid" : "ghost"
                }
                size={["md", "lg"]}
                rounded="full"
                leftIcon={<Icon as={GiWeightLiftingUp} boxSize="1.5rem" />}
            >
                <Text fontSize="xl">Exercise</Text>
            </Button>
        </Stack>
    );
}
