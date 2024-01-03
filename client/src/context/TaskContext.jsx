import { createContext, useReducer } from "react";

export const TaskContext = createContext();

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS": {
      return { listAndTasks: action.payload };
    }
    case "CREATE_TASK": {
      return { tasks: [...state.tasks, action.payload] };
    }
    case "SET_TASK": {
      return { task: action.payload };
    }
    default:
      return state;
  }
};

export const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: [],
    listAndTasks: null,
    task: null,
  });

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
