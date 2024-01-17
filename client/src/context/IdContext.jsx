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
    case "SET_PROJECT_ID": {
      return { ...state, project_id: action.payload };
    }
    case "SET_CHANNEL_ID": {
      return { ...state, channel_id: action.payload };
    }
    case "SET_CHAT_ID": {
      return { ...state, chat_id: action.payload };
    }
    default:
      return state;
  }
};

export const IdContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(idReducer, {
    task_id: null,
    board_id: null,
    list_id: null,
    project_id: null,
    channel_id: null,
    chat_id: null,
  });

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
