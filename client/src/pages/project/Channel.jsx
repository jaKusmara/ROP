import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../../utils/socekt";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import Message from "../../components/Message";
import { useChat } from "../../hooks/useChat";
import { useMessageContext } from "../../hooks/useContext/useMessageContext";

export default function Channel() {
  const { user } = useAuthContext();
  const { channel_id } = useParams();

  const { state } = useMessageContext();

  const { sendMessage, getMessages, error, isLoading } = useChat();

  const [messageFromSocket, setMessageFromSocket] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    getMessages(user, channel_id);
  }, [channel_id, messageFromSocket]);

  useEffect(() => {
    setMessageFromSocket(null);

    socket.emit("join", channel_id);

    socket.on("private_message", (data) => {
      setMessageFromSocket(data);
    });
  }, [channel_id]);

  return (
    <div className="flex flex-col h-full">
      <nav className="flex felx-row"></nav>
      <div className="flex flex-col px-2  overflow-auto h-full w-full">
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
      <footer className="flex max-w-[80%] flex-row items-center mt-4 gap-x-2">
        <textarea
          maxLength={1000}
          type="text"
          className="flex whitespace-wrap break-all rounded text-black border-gray-300 overflow-hidden resize-none w-[80%]"
          placeholder="Type your message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white rounded h-full hover:bg-blue-600 focus:outline-none w-[20%]"
          onClick={() => {
            sendMessage(user, channel_id, content), setContent("");
          }}
        >
          Send
        </button>
      </footer>
    </div>
  );
}
