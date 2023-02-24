import { createContext } from "react";

const DateContext = createContext(new Date(new Date().setHours(0, 0, 0, 0)));

export default DateContext;
