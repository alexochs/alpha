import { Button, Checkbox, Flex, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function DailyTasksHelpModal({ isOpen, onClose }: any) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent rounded="3xl" w={["90vw", "50vw"]}>
                <ModalHeader>Master your daily tasks</ModalHeader>
                <ModalCloseButton rounded="full" />

                <ModalBody>
                    <Text>
                        To create a new task, enter a name for the task and define the difficulty and importance of the task.
                    </Text>

                    <Text pt="1rem">
                        Your daily tasks are automatically sorted by their score, so you know which ones to complete first.
                    </Text>

                    <Text pt="1rem">
                        You can also edit the name, difficulty, or importance of the task afterwards.
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