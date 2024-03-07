import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { useMessageContext } from "../../hooks/useContext/useMessageContext";
import { useIdContext } from "../../hooks/useContext/useIdContext";
import { useChat } from "../../hooks/useChat";

import Message from "../../components/Message";

import socket from "../../utils/socekt";
import { useChatContext } from "../../hooks/useContext/useChatContext";

export default function DirectMessages() {
  const { user } = useAuthContext();
  const { state: idContextState } = useIdContext();
  const { state: messageContextState } = useMessageContext();
  const { sendMessage, getMessages } = useChat();

  const { state: chatState } = useChatContext();

  const [content, setContent] = useState("");
  const [messageFromSocket, setMessageFromSocket] = useState(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const chatContainer = chatContainerRef.current;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageContextState.messages]);

  useEffect(() => {
    getMessages(user, idContextState.chat_id);
  }, [idContextState.chat_id, messageFromSocket]);

  useEffect(() => {
    setMessageFromSocket(null);

    socket.emit("join", idContextState.chat_id);

    socket.on("private_message", (data) => {
      setMessageFromSocket(data);
    });

    return () => {
      socket.off("private_message");
    };
  }, [idContextState.chat_id]);
  console.log(chatState.receiver);
  return (
    <>
      <nav className="flex p-3">
        {chatState.receiver.avatar && (
          <img
            src={chatState.receiver.avatar}
            alt={chatState.receiver.username}
            width="50"
          />
        )}
        <div className="flex items-center text-xl">
          <p className="mx-3">{chatState.receiver.firstname}</p>
          <p>{chatState.receiver.surname}</p>
        </div>
      </nav>
      <div
        className="flex flex-col px-2 overflow-auto h-full w-full"
        ref={chatContainerRef}
      >
        {messageContextState.messages &&
          messageContextState.messages.map((message) => (
            <Message key={message._id} message={message} />
          ))}
      </div>

      <footer className="flex justify-center h-20 p-4">
        <input
          className="flex w-[75%] p-2 rounded-l border-gray-300 overflow-y-scroll resize-none text-black"
          placeholder="Type your message..."
          value={content}
          maxLength={1000}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-blue-500 w-[25%] text-white p-2 rounded-r hover:bg-blue-600 focus:outline-none"
          onClick={() => {
            sendMessage(user, idContextState.chat_id, content);
            setContent("");
          }}
        >
          Send
        </button>
      </footer>
    </>
  );
}
