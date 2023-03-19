import { Button, Checkbox, Flex, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function SenseiHelpModal({ isOpen, onClose }: any) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent rounded="3xl" w={["90vw", "50vw"]}>
                <ModalHeader>Sensei, your AI assistant</ModalHeader>
                <ModalCloseButton rounded="full" />

                <ModalBody>
                    <Text>
                        Sensei is your AI assistant that helps you keep up-to-date with your daily goals.
                    </Text>

                    <Text mt="1rem">
                        Link your Telegram account to receive your daily reminders and weekly summaries
                        directly in your Telegram chat from Sensei.
                    </Text>

                    <Text mt="1rem">
                        Chat with Sensei to update and to get help with your goals, or ask for advice on how to
                        improve your life.
                    </Text>

                    <Text mt="1rem">
                        Sensei is still in beta, so please be patient with us as we work to improve
                        Sensei&apos;s capabilities.
                    </Text>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose} rounded="full">
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}