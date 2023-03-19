import { CheckCircleIcon } from "@chakra-ui/icons";
import { Button, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FaQuestion, FaQuestionCircle, FaUser } from "react-icons/fa";
import { GiCycle, GiDividedSpiral, GiTomato } from "react-icons/gi";
import { MdFeedback } from "react-icons/md";

export default function MiscComponentsList({ onClose }: any) {
    const router = useRouter();
    const session = useSession();

    return (
        <Stack spacing="2rem">
            <Button
                onClick={() => {
                    window.location.href = `/profiles/${session?.user.id}`;
                    onClose();
                }}
                colorScheme="purple"
                variant={
                    router.asPath.includes(session?.user.id ? session?.user.id : "blablablamrfreeman") ? "solid" : "ghost"
                }
                size={["md", "lg"]}
                rounded="full"
                leftIcon={<Icon as={FaUser} boxSize="1.5rem" />}
            >
                <Text fontSize="xl">My Profile</Text>
            </Button>

            <Link href="https://forms.gle/UDpoVAaqpfBFxv8y5" target="_blank" style={{ textDecoration: "none" }}>
                <Button
                    colorScheme="purple"
                    variant="ghost"
                    size={["md", "lg"]}
                    rounded="full"
                    leftIcon={<Icon as={MdFeedback} boxSize="1.5rem" />}
                >
                    <Text fontSize="xl">Feedback</Text>
                </Button>
            </Link>

            <Button
                onClick={() => {
                    window.location.href = `/faq`;
                    onClose();
                }}
                colorScheme="purple"
                variant={
                    router.asPath.includes("faq") ? "solid" : "ghost"
                }
                size={["md", "lg"]}
                rounded="full"
                leftIcon={<Icon as={FaQuestionCircle} boxSize="1.5rem" />}
            >
                <Text fontSize="xl">FAQ</Text>
            </Button>
        </Stack>
    );
}
