import { Button, Checkbox, Flex, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function HabitTrackerHelpModal({ profileId, habits, setHabits, date, isOpen, onClose }: any) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent rounded="3xl" w={["90vw", "50vw"]}>
                <ModalHeader>Track your habits</ModalHeader>
                <ModalCloseButton rounded="full" />

                <ModalBody>
                    <Text>
                        To create a new habit, enter a name for the habit and select the days of the week that you want to complete the habit.
                    </Text>

                    <Text pt="1rem">
                        Keep track of your habits by checking off the days that you completed the habit, day by day.
                    </Text>

                    <Text pt="1rem">
                        You can also edit the name of the habit or delete the habit.
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