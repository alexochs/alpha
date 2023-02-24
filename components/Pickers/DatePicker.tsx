import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import DateContext from "../../contexts/DateContext";

export default function DatePicker() {
    const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
    const [dateString, setDateString] = useState(
        date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        })
    );

    useEffect(() => {
        localStorage.setItem("date", date.toString());
    });

    function today() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        localStorage.setItem("date", today.toString());
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
        localStorage.setItem("date", next.toString());

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
        localStorage.setItem("date", prev.toString());

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
        <HStack>
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
