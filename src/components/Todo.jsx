import { useState } from "react";
import { useImmer } from "use-immer";

var currId = 2;

export default function Todo() {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [tasks, setTasks] = useImmer([
    {
      id: 1,
      title: "Dummy Task",
      isDone: false,
    },
  ]);

  function handleInputChange(e) {
    setNewTaskTitle(e.target.value);
  }

  function handleAddTask() {
    if (newTaskTitle.length > 0) {
      setTasks((draft) => {
        draft.push({
          id: currId++,
          title: newTaskTitle,
          idDone: false,
        });
      });
    }
  }

  function allTasks() {
    return tasks.map((task) => {
      return (
        <li key={task.id}>
          <div>
            <input type="checkbox" name={task.id} />
            <span>{task.title}</span>
            <button>delete</button>
            <button>edit</button>
          </div>
        </li>
      );
    });
  }
  return (
    <>
      <div>
        <input placeholder="Add Task" onChange={handleInputChange} />
        <button onClick={handleAddTask}>Add Task</button>
        <ul type="none">{allTasks()}</ul>
      </div>
    </>
  );
}
