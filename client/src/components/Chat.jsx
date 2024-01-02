import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useMessageContext } from "../hooks/useContext/useMessageContext";
import { useChat } from "../hooks/useChat";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import socket from "../utils/socekt";
import Message from "./Message";

export default function Chat() {
  const { user } = useAuthContext();
  const { sendMessage, getMessages, error, isLoading } = useChat();
  const { state, dispatch } = useMessageContext();
  const [content, setContent] = useState("");
  const [receiveDataFromSocket, setReceiveDataFromSocket] = useState(null);

  const chat_id = JSON.parse(localStorage.getItem("c_id"));

  useEffect(() => {
    socket.emit("join", chat_id);

    return () => {
      socket.off("join");
    };
  }, [chat_id]);

  useEffect(() => {
    socket.on("private_message", (message) => {
      setReceiveDataFromSocket(message);
    });

    return () => {
      socket.off("private_message");
    };
  }, []);

  useEffect(() => {
    getMessages(user, chat_id);
    if (receiveDataFromSocket !== null) {
      getMessages(user, chat_id);
      setReceiveDataFromSocket(null);
    }
  }, [user, chat_id, receiveDataFromSocket]);

  const handleSendMessage = (user, chat_id, content) => {
    sendMessage(user, chat_id, content);

    socket.emit("private_message", {
      content,
      to: chat_id,
    });

    setContent("");
  };

  return (
    <div className="flex flex-col justify-between border-l w-[70%]">
      <div className="flex flex-col px-2 overflow-hidden overflow-y-scroll h-full w-full">
        <h2>Welcome in chat with </h2>
        {state.messages &&
          state.messages.map((message) => (
            <Message
              key={message._id}
              message={message}
              error={error}
              loding={isLoading}
            />
          ))}
      </div>

      <footer className="flex flex-row items-center p-4">
        <input
          type="text"
          className="flex whitespace-wrap break-all p-2 rounded-l border-gray-300 overflow-y-scroll w-max-[50%]"
          placeholder="Type your message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 focus:outline-none"
          onClick={() => handleSendMessage(user, chat_id, content)}
        >
          Send
        </button>
      </footer>
    </div>
  );
}
