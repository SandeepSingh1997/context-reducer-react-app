import { createContext } from "react";

const TaskContext = createContext();

function TaskContextProvider({ children, value }) {
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export { TaskContext, TaskContextProvider };
