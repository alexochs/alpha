import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";

const useDateImpl = () => {
    const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

    const handleDateChange = (date: Date) => {
        setDate(date);
    };

    return [date, setDate];
};

export const useDate = singletonHook(
    new Date(new Date().setHours(0, 0, 0, 0)),
    useDateImpl
);
