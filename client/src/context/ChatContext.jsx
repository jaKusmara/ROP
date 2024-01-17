import { createContext, useReducer } from "react";

export const ChatContext = createContext();

export const chatReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHAT": {
      return { ...state, chat: action.payload };
    }
    case "SET_FRIENDS": {
      return {
        ...state,
        friends: action.payload,
      };
    }
    default:
      return state;
  }
};

export const ChatContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, {
    chat: null,
    friends: null,
  });

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
