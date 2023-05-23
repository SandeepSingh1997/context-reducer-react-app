import { useState } from "react";
import { useImmerReducer } from "use-immer";
import Task from "./Task";
import tasksReducer from "./tasksReducer.js";
import { TaskContextProvider } from "./TaskContextProvider";

var currId = 1;

export default function Todo() {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const initialTasks = [
    {
      id: 0,
      title: "Dummy Task",
      isDone: false,
    },
  ];

  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

  function handleEditTask(taskId, newTitle) {
    dispatch({ type: "EDIT", payload: { taskId, newTitle } });
  }

  function handleTaskDelete(taskId) {
    dispatch({ type: "DELETE", payload: { taskId: taskId } });
  }

  function handleOnCheckChange(taskId) {
    dispatch({ type: "TOGGLE_CHECKBOX", payload: { taskId } });
  }

  function handleInputChange(e) {
    setNewTaskTitle(e.target.value);
  }

  function handleAddTask() {
    dispatch({ type: "ADD", payload: { title: newTaskTitle, currId: currId } });
    currId++;
  }

  function allTasks() {
    return tasks.map((task) => {
      if (task === null) return null;
      return <Task key={task.id} task={task} />;
    });
  }

  return (
    <>
      <div>
        <input placeholder="Add Task" onChange={handleInputChange} />
        <button onClick={handleAddTask}>Add Task</button>
        <TaskContextProvider
          value={{
            onDeleteTask: handleTaskDelete,
            onTaskCheck: handleOnCheckChange,
            onEditTask: handleEditTask,
          }}
        >
          <ul type="none">{allTasks()}</ul>
        </TaskContextProvider>
      </div>
    </>
  );
}
