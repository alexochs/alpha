import { CheckCircleIcon } from "@chakra-ui/icons";
import { Button, Stack, Text, Icon } from "@chakra-ui/react";
import { BiNews } from "react-icons/bi";
import { BsJournalText } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import {
    GiCycle,
    GiMeditation,
    GiShinyApple,
    GiWeightLiftingUp,
} from "react-icons/gi";
import { IoShareSocialSharp } from "react-icons/io5";
import { MdOutlineForum } from "react-icons/md";

export default function CategoryComponents({
    component,
    setComponent,
    category,
    setCategory,
    onClose,
}: any) {
    const CATEGORY_TIME = 0;
    const COMPONENT_MASTERY_CHECKLIST = 0;
    const COMPONENT_HABIT_TRACKER = 1;

    const CATEGORY_MIND = 1;
    const COMPONENT_MEDITATE = 2;
    const COMPONENT_JOURNAL = 3;

    const CATEGORY_HEALTH = 2;
    const COMPONENT_DIET = 4;
    const COMPONENT_EXERCISE = 5;

    const CATEGORY_NETWORK = 3;
    const COMPONENT_NEWS_TICKER = 7;
    const COMPONENT_FORUM = 8;
    const COMPONENT_MEMBERS = 9;
    const COMPONENT_SOCIAL_MEDIA = 10;

    if (category === CATEGORY_TIME) {
        return (
            <Stack spacing="2rem">
                <Button
                    onClick={() => {
                        setCategory(CATEGORY_TIME);
                        setComponent(COMPONENT_MASTERY_CHECKLIST);
                        onClose();
                    }}
                    colorScheme="yellow"
                    variant={
                        component === COMPONENT_MASTERY_CHECKLIST
                            ? "solid"
                            : "ghost"
                    }
                    size={["md", "lg"]}
                    rounded="full"
                    leftIcon={<CheckCircleIcon boxSize="1.5rem" />}
                >
                    <Text fontSize="xl">Mastery Checklist</Text>
                </Button>
                <Button
                    onClick={() => {
                        setCategory(CATEGORY_TIME);
                        setComponent(COMPONENT_HABIT_TRACKER);
                        onClose();
                    }}
                    colorScheme="yellow"
                    variant={
                        component === COMPONENT_HABIT_TRACKER
                            ? "solid"
                            : "ghost"
                    }
                    size={["md", "lg"]}
                    rounded="full"
                    leftIcon={<Icon as={GiCycle} boxSize="1.5rem" />}
                >
                    <Text fontSize="xl">Habit Tracker</Text>
                </Button>
            </Stack>
        );
    } else if (category === CATEGORY_MIND) {
        return (
            <Stack spacing="2rem">
                <Button
                    isDisabled={true}
                    onClick={() => setComponent(COMPONENT_MEDITATE)}
                    colorScheme="blue"
                    variant={
                        component === COMPONENT_MEDITATE ? "solid" : "ghost"
                    }
                    size={["md", "lg"]}
                    rounded="full"
                    leftIcon={<Icon as={GiMeditation} boxSize="1.5rem" />}
                >
                    <Text fontSize="xl">Meditate</Text>
                </Button>
                <Button
                    isDisabled={true}
                    onClick={() => setComponent(COMPONENT_JOURNAL)}
                    colorScheme="blue"
                    variant={
                        component === COMPONENT_JOURNAL ? "solid" : "ghost"
                    }
                    size={["md", "lg"]}
                    rounded="full"
                    leftIcon={<Icon as={BsJournalText} boxSize="1.5rem" />}
                >
                    <Text fontSize="xl">Journal</Text>
                </Button>
            </Stack>
        );
    } else if (category === CATEGORY_HEALTH) {
        return (
            <Stack spacing="2rem">
                <Button
                    isDisabled={true}
                    onClick={() => setComponent(COMPONENT_DIET)}
                    colorScheme="green"
                    variant={component === COMPONENT_DIET ? "solid" : "ghost"}
                    size={["md", "lg"]}
                    rounded="full"
                    leftIcon={<Icon as={GiShinyApple} boxSize="1.5rem" />}
                >
                    <Text fontSize="xl">Diet</Text>
                </Button>
                <Button
                    isDisabled={true}
                    onClick={() => setComponent(COMPONENT_EXERCISE)}
                    colorScheme="green"
                    variant={
                        component === COMPONENT_EXERCISE ? "solid" : "ghost"
                    }
                    size={["md", "lg"]}
                    rounded="full"
                    leftIcon={<Icon as={GiWeightLiftingUp} boxSize="1.5rem" />}
                >
                    <Text fontSize="xl">Exercise</Text>
                </Button>
            </Stack>
        );
    } else if (category === CATEGORY_NETWORK) {
        return (
            <Stack spacing="2rem">
                <Button
                    isDisabled={true}
                    onClick={() => setComponent(COMPONENT_FORUM)}
                    colorScheme="red"
                    variant={component === COMPONENT_FORUM ? "solid" : "ghost"}
                    size={["md", "lg"]}
                    rounded="full"
                    leftIcon={<Icon as={MdOutlineForum} boxSize="1.5rem" />}
                >
                    <Text fontSize="xl">Forum</Text>
                </Button>
                <Button
                    isDisabled={true}
                    onClick={() => setComponent(COMPONENT_NEWS_TICKER)}
                    colorScheme="red"
                    variant={
                        component === COMPONENT_NEWS_TICKER ? "solid" : "ghost"
                    }
                    size={["md", "lg"]}
                    rounded="full"
                    leftIcon={<Icon as={BiNews} boxSize="1.5rem" />}
                >
                    <Text fontSize="xl">News Ticker</Text>
                </Button>
                <Button
                    isDisabled={true}
                    onClick={() => setComponent(COMPONENT_SOCIAL_MEDIA)}
                    colorScheme="red"
                    variant={
                        component === COMPONENT_SOCIAL_MEDIA ? "solid" : "ghost"
                    }
                    size={["md", "lg"]}
                    rounded="full"
                    leftIcon={<Icon as={IoShareSocialSharp} boxSize="1.5rem" />}
                >
                    <Text fontSize="xl">Social Media</Text>
                </Button>
                <Button
                    isDisabled={true}
                    onClick={() => setComponent(COMPONENT_MEMBERS)}
                    colorScheme="red"
                    variant={
                        component === COMPONENT_MEMBERS ? "solid" : "ghost"
                    }
                    size={["md", "lg"]}
                    rounded="full"
                    leftIcon={<Icon as={FaUsers} boxSize="1.5rem" />}
                >
                    <Text fontSize="xl">Members</Text>
                </Button>
            </Stack>
        );
    } else {
        return <Text>ERROR: CategoryComponent</Text>;
    }
}
