import axios from "axios";
import { useState } from "react";
import { useChatContext } from "./useContext/useChatContext";
import { useMessageContext } from "./useContext/useMessageContext";

export const useChat = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setChat } = useChatContext();
  const { dispatch } = useMessageContext();

  const openChat = async (user, reciever_id) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/chat/useChat?receiver_id=${reciever_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("c_id", JSON.stringify(response.data._id));
        setChat(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const sendMessage = async (user, chat_id, content) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/message/sendMessage?chat_id=${chat_id}`,
        { content: content },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const getMessages = async (user, chat_id) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/message/getAllMessages?chat_id=${chat_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch({ type: "SET_MESSAGES", payload: response.data });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return { openChat, sendMessage, getMessages, error, isLoading };
};
