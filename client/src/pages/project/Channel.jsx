import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../../utils/socekt";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import Message from "../../components/Message";
import { useChat } from "../../hooks/useChat";
import { useMessageContext } from "../../hooks/useContext/useMessageContext";

export default function Channel() {
  const { sendMessage, getMessages, error, isLoading } = useChat();
  const { user } = useAuthContext();
  const { channel_id } = useParams();
  const [receiveDataFromSocket, setReceiveDataFromSocket] = useState(null);
  const [content, setContent] = useState("");
  const { state } = useMessageContext();

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

  const handleSendMessage = (user, chat_id, content) => {
    sendMessage(user, chat_id, content);

    socket.emit("private_message", {
      content,
      to: chat_id,
    });

    setContent("");
  };

  useEffect(() => {
    getMessages(user, chat_id);
    if (receiveDataFromSocket !== null) {
      getMessages(user, chat_id);
      setReceiveDataFromSocket(null);
    }
  }, [user, chat_id, receiveDataFromSocket]);

  return (
    <div className="flex flex-col h-full">
      <nav className="flex felx-row">
       
      </nav>
      <div className="flex flex-col px-2 overflow-hidden overflow-y-scroll h-full w-full">
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
          onClick={() => handleSendMessage(user, channel_id, content)}
        >
          Send
        </button>
      </footer>
    </div>
  );
}
