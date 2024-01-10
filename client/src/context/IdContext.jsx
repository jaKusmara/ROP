import { createContext, useReducer } from "react";

export const IdContext = createContext();

export const idReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASK_ID": {
      return { ...state, task_id: action.payload };
    }
    case "SET_BOARD_ID": {
      return { ...state, board_id: action.payload };
    }
    case "SET_LIST_ID": {
      return { ...state, list_id: action.payload };
    }
    default:
      return state;
  }
};

export const IdContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(idReducer, { task_id: null, board_id: null, list_id: null });

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
