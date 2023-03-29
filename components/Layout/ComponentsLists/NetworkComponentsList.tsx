import { CheckCircleIcon } from "@chakra-ui/icons";
import { Button, Icon, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiNews } from "react-icons/bi";
import { BsJournalText } from "react-icons/bs";
import { FaRobot, FaUsers } from "react-icons/fa";
import {
    GiCycle,
    GiMeditation,
    GiShinyApple,
    GiWeightLiftingUp,
} from "react-icons/gi";
import { IoShareSocialSharp } from "react-icons/io5";
import { MdOutlineForum } from "react-icons/md";

export default function NetworkComponentsList({ onClose }: any) {
    const router = useRouter();

    return (
        <Stack spacing="2rem">
            <Button
                isDisabled={true}
                // onClick={() => setComponent(COMPONENT_FORUM)}
                colorScheme="red"
                variant={router.asPath.includes("/forum") ? "solid" : "ghost"}
                size={["md", "lg"]}
                rounded="full"
                leftIcon={<Icon as={MdOutlineForum} boxSize="1.5rem" />}
            >
                <Text fontSize="xl">Forum</Text>
            </Button>

            <Button
                isDisabled={true}
                //onClick={() => setComponent(COMPONENT_NEWS_TICKER)}
                colorScheme="red"
                variant={
                    router.asPath.includes("/news-ticker") ? "solid" : "ghost"
                }
                size={["md", "lg"]}
                rounded="full"
                leftIcon={<Icon as={BiNews} boxSize="1.5rem" />}
            >
                <Text fontSize="xl">News Ticker</Text>
            </Button>

            <Button
                isDisabled={true}
                //onClick={() => setComponent(COMPONENT_SOCIAL_MEDIA)}
                colorScheme="red"
                variant={
                    router.asPath.includes("/social-media") ? "solid" : "ghost"
                }
                size={["md", "lg"]}
                rounded="full"
                leftIcon={<Icon as={IoShareSocialSharp} boxSize="1.5rem" />}
            >
                <Text fontSize="xl">Social Media</Text>
            </Button>

            <Button
                isDisabled={true}
                //onClick={() => setComponent(COMPONENT_MEMBERS)}
                colorScheme="red"
                variant={router.asPath.includes("/members") ? "solid" : "ghost"}
                size={["md", "lg"]}
                rounded="full"
                leftIcon={<Icon as={FaUsers} boxSize="1.5rem" />}
            >
                <Text fontSize="xl">Members</Text>
            </Button>

            <Button
                onClick={() => {
                    window.location.href = "/network/sensai";
                    onClose();
                }}
                colorScheme="red"
                variant={
                    router.asPath.includes("/sensai") ? "solid" : "ghost"
                }
                size={["md", "lg"]}
                rounded="full"
                leftIcon={<Icon as={FaRobot} boxSize="1.5rem" />}
            >
                <Text fontSize="xl">SensAI</Text>
            </Button>
        </Stack>
    );
}
