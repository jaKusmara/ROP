import { createContext, useReducer } from "react";

export const BoardContext = createContext();

export const boardReducer = (state, action) => {
  switch (action.type) {
    case "SET_LISTS": {
      return { ...state, lists: action.payload };
    }
    case "CREATE_LIST": {
      return { ...state, lists: [...state.lists, action.payload] };
    }
    case "SET_TASKS": {
      return { ...state, tasks: action.payload };
    }
    case "CREATE_TASK": {
      return { ...state, tasks: [...state.tasks, action.payload] };
    }
    case "SET_TASK": {
      return { ...state, task: action.payload };
    }
    case "SET_PARTICIPANTS": {
      return { ...state, participants: action.payload };
    }
    default:
      return state;
  }
};
export const BoardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, {
    lists: [],
    tasks: [],
    task: null,
    participants: [],
  });

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};
