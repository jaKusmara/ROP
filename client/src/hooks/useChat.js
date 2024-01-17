import axios from "axios";
import { useState } from "react";
import { useChatContext } from "./useContext/useChatContext";
import { useMessageContext } from "./useContext/useMessageContext";
import { useIdContext } from "./useContext/useIdContext";
import socket from "../utils/socekt";

export const useChat = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch: chatContextDisp } = useChatContext();
  const { dispatch: idContextDisp } = useIdContext();
  const { dispatch: messageContextDisp } = useMessageContext();

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
        chatContextDisp({ type: "SET_CHAT", payload: response.data });
        idContextDisp({ type: "SET_CHAT_ID", payload: response.data._id });
        messageContextDisp({ type: "SET_MESSAGE", payload: [] });
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

        socket.emit("private_message", {
          to: chat_id,
        });

        setIsLoading(false);
      }
    } catch (error) {
      // setIsLoading(false);
      // setError(error);
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
        console.log(response);
        messageContextDisp({ type: "SET_MESSAGES", payload: response.data });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const getFriends = async (user) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/friend/allUserFriends`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        chatContextDisp({ type: "SET_FRIENDS", payload: response.data });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };
  return { openChat, sendMessage, getMessages, getFriends, error, isLoading };
};
