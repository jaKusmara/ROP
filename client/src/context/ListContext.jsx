import { createContext, useReducer } from "react";

export const ListContext = createContext();

export const listReducer = (state, action) => {
  switch (action.type) {
    case "SET_LISTS": {
      return { ...state, lists: action.payload };
    }
    case "CREATE_LIST": {
      return { lists: [...state.lists, action.payload] };
    }
    default:
      return state;
  }
};
export const ListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listReducer, { lists: null });

  return (
    <ListContext.Provider value={{ state, dispatch }}>
      {children}
    </ListContext.Provider>
  );
};
