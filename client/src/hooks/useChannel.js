import axios from "axios";
import { useState } from "react";
import { useChannelContext } from "./useContext/useChannelContext";
import socket from "../utils/socekt";

export const useChannel = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useChannelContext();

  const getChannel = async (user, channel_id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/channel/getChannel?channel_id=${channel_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch({ type: "SET_CHANNEL", payload: response.data });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const getProjectChannels = async (user, project_id) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/project/getAllProjectChannels?project_id=${project_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch({ type: "SET_CHANNELS", payload: response.data });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const createChannel = async (user, project_id, title) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/channel/createChannel?project_id=${project_id}`,
        {
          title: title,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response);

        // socket.emit("channel_refresh", {
        //   to: project_id,
        // });

        
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return { getChannel, getProjectChannels, createChannel, error, isLoading };
};
