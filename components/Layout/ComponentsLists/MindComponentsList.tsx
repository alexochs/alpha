import { CheckCircleIcon } from "@chakra-ui/icons";
import { Button, Icon, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsJournalText } from "react-icons/bs";
import { GiCycle, GiMeditation } from "react-icons/gi";

export default function MindComponentsList({ onClose }: any) {
    const router = useRouter();

    return (
        <Stack spacing="2rem">
            <Button
                isDisabled={true}
                //onClick={() => setComponent(COMPONENT_MEDITATE)}
                colorScheme="blue"
                variant={
                    router.asPath.includes("/meditate") ? "solid" : "ghost"
                }
                size={["md", "lg"]}
                rounded="full"
                leftIcon={<Icon as={GiMeditation} boxSize="1.5rem" />}
            >
                <Text fontSize="xl">Meditate</Text>
            </Button>
            <Button
                isDisabled={true}
                //onClick={() => setComponent(COMPONENT_JOURNAL)}
                colorScheme="blue"
                variant={router.asPath.includes("/journal") ? "solid" : "ghost"}
                size={["md", "lg"]}
                rounded="full"
                leftIcon={<Icon as={BsJournalText} boxSize="1.5rem" />}
            >
                <Text fontSize="xl">Journal</Text>
            </Button>
        </Stack>
    );
}
