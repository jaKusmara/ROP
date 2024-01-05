import { createContext, useReducer } from "react";

export const IdContext = createContext();

export const idReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASK_ID": {
      return { taskId: action.payload };
    }
    default:
      return state;
  }
};

export const IdContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(idReducer, { taskId: null });

  return (
    <IdContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </IdContext.Provider>
  );
};
