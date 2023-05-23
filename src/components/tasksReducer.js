export default function tasksReducer(draft, action) {
  switch (action.type) {
    case "ADD": {
      const newTaskTitle = action.payload.title;
      const currId = action.payload.currId;
      if (newTaskTitle.length > 0) {
        draft.push({
          id: currId,
          title: newTaskTitle,
          isDone: false,
        });
      }
      break;
    }

    case "DELETE": {
      const taskId = action.payload.taskId;
      const index = draft.findIndex((task) => task.id === taskId);
      if (index !== -1) draft.splice(index, 1);
      break;
    }

    case "TOGGLE_CHECKBOX": {
      const taskId = action.payload.taskId;
      for (let task of draft) {
        if (task.id === taskId) {
          task.isDone = !task.isDone;
        }
      }
      break;
    }

    case "EDIT": {
      const taskId = action.payload.taskId;
      const newTitle = action.payload.newTitle;
      for (const task of draft) {
        if (task.id === taskId) {
          task.title = newTitle;
        }
      }
    }
    default: {
      break;
    }
  }
}
