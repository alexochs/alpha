import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function DatePicker({ date, setDate }: any) {
    const [dateString, setDateString] = useState(
        date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        })
    );

    function today() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        setDate(today);
        setDateString(
            today.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            })
        );
    }

    function nextDay() {
        const next = new Date(date.getTime() + 86400000);
        next.setHours(0, 0, 0, 0);

        setDate(new Date(date.getTime() + 86400000));
        setDateString(
            new Date(date.getTime() + 86400000).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            })
        );
    }

    function previousDay() {
        const prev = new Date(date.getTime() - 86400000);
        prev.setHours(0, 0, 0, 0);

        setDate(new Date(date.getTime() - 86400000));
        setDateString(
            new Date(date.getTime() - 86400000).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            })
        );
    }

    return (
        <HStack spacing="0.5rem">
            <Button onClick={previousDay} rounded="full" variant="ghost">
                {"<"}
            </Button>
            <Button onClick={today} rounded="full" variant="ghost">
                {dateString}
            </Button>
            <Button onClick={nextDay} rounded="full" variant="ghost">
                {">"}
            </Button>
        </HStack>
    );
}
