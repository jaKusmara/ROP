import { createContext, useReducer } from "react";

export const TaskContext = createContext();

export const tasksReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: [],
    task: null,
    participants: [],
  });

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
