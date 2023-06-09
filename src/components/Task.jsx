import { useContext, useState } from "react";
import { TaskContext } from "./TaskContextProvider";

export default function Task({ task }) {
  const [editTitleText, setEditTitleText] = useState("");
  const [showEditInput, setShowEditInput] = useState(false);

  const { onTaskCheck, onDeleteTask, onEditTask } = useContext(TaskContext);

  return (
    <li key={task.id}>
      <div>
        <input
          type="checkbox"
          name={task.id}
          onChange={() => {
            onTaskCheck(task.id);
          }}
          checked={task.isDone}
        />
        <span>{task.title + task.id}</span>
        <button
          onClick={() => {
            onDeleteTask(task.id);
          }}
        >
          delete
        </button>
        <button
          onClick={() => {
            setShowEditInput(!showEditInput);
            // onEditTask(task.id, newTitle);
          }}
        >
          edit
        </button>
        {showEditInput && (
          <div>
            <input
              type="text"
              placeholder="New Title"
              onChange={(e) => {
                setEditTitleText(e.target.value);
              }}
              value={editTitleText}
            />
            <button
              onClick={() => {
                onEditTask(task.id, editTitleText);
              }}
            >
              save
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
