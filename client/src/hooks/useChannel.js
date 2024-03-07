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

        dispatch({ type: "CREATE_CHANNEL", payload: response.data });

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const deleteChannel = async (user, channel_id) => {
    setIsLoading(true);

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/channel/deleteChannel?channel_id=${channel_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);

        dispatch({ type: "DELETE_CHANNEL", payload: response.data });

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const editChannelTitle = async (user, channel_id, title) => {
    setIsLoading(true);
    console.log(title);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/channel/editChannelTitle?channel_id=${channel_id}&title=${title}`,
        {},

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status) {
        dispatch({ type: "EDIT_TITLE", payload: { channel_id, title } });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);

      console.error(error);
    }
  };

  return {
    getChannel,
    getProjectChannels,
    createChannel,
    deleteChannel,
    editChannelTitle,
    error,
    isLoading,
  };
};
