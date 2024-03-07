import { createContext, useReducer } from "react";

export const ChatContext = createContext();

export const chatReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHAT": {
      return { ...state, chat: action.payload };
    }
    case "SET_RECEIVER": {
      return { ...state, receiver: action.payload };
    }
    case "SET_FRIENDS": {
      return {
        ...state,
        friends: action.payload,
      };
    }
    case "ADD_FRIENDS": {
      return {
        ...state,
        friends: [...state.friends, action.payload],
      };
    }
    case "REMOVE_FRIENDS": {
      return {
        ...state,
        friends: [
          ...state.friends.filter((friend) => friend._id != action.payload._id),
        ],
      };
    }
    default:
      return state;
  }
};

export const ChatContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, {
    chat: null,
    receiver: null,
    friends: [],
  });

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
