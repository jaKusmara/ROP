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
        channels: [...state.channels, action.payload],
      };
    }
    case "DELETE_CHANNEL": {
      return {
        ...state,
        channels: [
          ...state.channels.filter(
            (channel) => channel._id != action.payload._id
          ),
        ],
      };
    }
    case "EDIT_TITLE": {
      return {
        ...state,
        channels: state.channels.map((channel) =>
          channel._id === action.payload.channel_id
            ? { ...channel, title: action.payload.title }
            : channel
        ),
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
