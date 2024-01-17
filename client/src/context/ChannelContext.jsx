import { createContext, useReducer } from "react";

export const ChannelContext = createContext();

export const channelReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHANNELS": {
      return { ...state, channels: action.payload };
    }
    case "SET_CHANNEL": {
      return {
        ...state,
        channel: action.payload,
      };
    }
    case "CREATE_CHANNEL": {
      return {
        ...state,
        channel: [...state.channels, action.payload],
      };
    }
    default:
      return state;
  }
};

export const ChannelContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(channelReducer, {
    channel: null,
    channels: null,
  });

  return (
    <ChannelContext.Provider value={{ state, dispatch }}>
      {children}
    </ChannelContext.Provider>
  );
};
