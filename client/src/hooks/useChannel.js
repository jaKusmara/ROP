import axios from "axios";
import { useState } from "react";
import { useChannelContext } from "./useContext/useChannelContext";
import { useAuthContext } from "./useContext/useAuthContext";

export const useChannel = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setChannel } = useChannelContext();

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
        setChannel(response.data)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return { getChannel, error, isLoading };
};
