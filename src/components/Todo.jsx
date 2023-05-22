import { useEffect, useState } from "react";
import { useImmer } from "use-immer";

var currId = 1;

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
          id: currId,
          title: newTaskTitle,
          isDone: false,
        });
      });
      currId++;
    }
  }

  // useEffect(() => {
  //   console.log(tasks);
  // });

  function handleOnCheckChange(taskId) {
    setTasks((draft) => {
      for (let task of draft) {
        if (task.id === taskId) {
          task.isDone = !task.isDone;
        }
      }
    });
  }

  function handleTaskDelete(taskId) {
    setTasks((draft) => {
      const index = draft.findIndex((task) => task.id === taskId);
      if (index !== -1) draft.splice(index, 1);
    });
  }

  function allTasks() {
    return tasks.map((task) => {
      if (task === null) return null;
      return (
        <li key={task.id}>
          <div>
            <input
              type="checkbox"
              name={task.id}
              onChange={() => {
                handleOnCheckChange(task.id);
              }}
              checked={task.isDone}
            />
            <span>{task.title + task.id}</span>
            <button
              onClick={() => {
                handleTaskDelete(task.id);
              }}
            >
              delete
            </button>
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
